const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    userName: String!
    email: String!
  }

  type Query {
    getUserById(_id: ID!): User
    me: User
    resetPasswordRequest(email: String!): User
  }

  type Mutation {
    signUp(userName: String!, email: String!, password: String!): AuthSignUp
    logIn(userName: String!, password: String!): AuthLogin
    sendResetPasswordEmail(email: String!): Boolean!
    resetPassword(password: String!): AuthReset
  }

  type AuthSignUp {
    token: String!
    newUser: User!
  }

  type AuthLogin {
    token: String!
    foundUser: User!
  }

  type AuthReset {
    token: String!
    updatedUser: User!
  }
`;

module.exports = typeDefs;
