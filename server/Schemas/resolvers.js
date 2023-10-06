const { AuthenticationError, ApolloError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getUserById: async (_, { _id }) => {
            try {
                return await User.findOne({ _id });
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
        }
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
                throw new ApolloError(`Error during login: ${error.message}.`);
            }
        },
        resetPassword: async (_, { newPassword }, context) => {
            try {
                if (context.user) {
                    const updatedUser = await User.findByIdAndUpdate({ _id: context.user._id }, { password: newPassword });
                    const token = signToken(updatedUser);
                    return { token, newUser };
                }
            } catch (error) {
                throw new ApolloError(`Error creating user: ${error.message}.`);
            }
        },
    }
}

module.exports = resolvers;