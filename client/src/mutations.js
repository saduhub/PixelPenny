import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation signUp($userName: String!, $email: String!, $password: String!) {
    signUp(userName: $userName, email: $email, password: $password) {
      newUser {
        _id
        email
        userName
      }
      token
    }
  }
`;
