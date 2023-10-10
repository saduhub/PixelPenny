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

export const LOG_IN = gql`
  mutation logIn($userName: String!, $password: String!) {
    logIn(userName: $userName, password: $password) {
      foundUser {
        _id
        userName
      }
      token
    }
  }
`;

export const SEND_RESET_PASSWORD_EMAIL = gql`
  mutation sendResetPasswordEmail($email: String!) {
    sendResetPasswordEmail(email: $email)
  }
`;