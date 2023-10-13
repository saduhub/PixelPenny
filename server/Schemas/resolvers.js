const { AuthenticationError, ApolloError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken, signNewPasswordToken, sendEmail } = require('../utils/auth');

const resolvers = {
    Query: {
        getUserById: async (_, { _id }) => {
            try {
                const user = await User.findOne({ _id });

                if (!user) {
                    throw new ApolloError(`No user found by id.`);
                }

                return user; 
            } catch (error) {
                throw new ApolloError(`Error fetching user by id: ${error.message}.`);
            }
        },
        me: async (_, args, context) => {
            try {
                if (context.user) {
                    return await User.findOne({ _id: context.user._id });
                }
            } catch (error) {
                throw new ApolloError(`Error fetching user: ${error.message}.`);
            }
        },
    },
    Mutation: {
        signUp: async (_, { userName, email, password }) => {
            try {
                const newUser = await User.create({ userName, email, password });
                const token = signToken(newUser);
                return { token, newUser };
            } catch (error) {
                throw new ApolloError(`Error creating user: ${error.message}.`);
            }
        },
        logIn: async (_, { userName, password }) => {
            try {
                const foundUser = await User.findOne({ userName });

                if (!foundUser) {
                    throw new AuthenticationError('User not found.');
                }
        
                const checkPassword = await foundUser.isPasswordCorrect(password);
        
                if (!checkPassword) {
                    throw new AuthenticationError('Wrong password.');
                }
        
                const token = signToken(foundUser);
                return { token, foundUser };
                
            } catch (error) {
                throw new ApolloError(`Cannot process request at this time.`);
            }
        },
        sendResetPasswordEmail: async (_, { email }) => {
            try {
                const foundUser = await User.findOne({ email });

                if (!foundUser) {
                    throw new AuthenticationError('User not found.');
                }

                const resetPasswordToken = signNewPasswordToken(foundUser);
                const resetLink = `http://localhost:3000//reset-password?token=${resetPasswordToken}`;
                await sendEmail(email, resetLink);

                if (resetPasswordToken) {
                    return true;
                } else {
                    throw new Error("Token not generated.")
                }
                
                
            } catch (error) {
                throw new ApolloError(`Error during login: ${error.message}.`);
            }
        },
        resetPassword: async (_, { newPassword }, context) => {
            try {
                if (context.user) {
                    const updatedUser = await User.findById(context.user._id);
                    if (!updatedUser) {
                        throw new AuthenticationError('User not found.');
                    }
                    updatedUser.password = newPassword;
                    await updatedUser.save()
                    const token = signToken(updatedUser);
                    return { token, updatedUser };
                }
            } catch (error) {
                throw new ApolloError(`Error creating user: ${error.message}.`);
            }
        },
    }
}

module.exports = resolvers;