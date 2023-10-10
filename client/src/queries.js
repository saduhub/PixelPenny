import { gql } from "@apollo/client";

export const RESET_PASSWORD_REQUEST = gql`
    query resetPasswordRequest($email: String!) {
        resetPasswordRequest(email: $email) {
        email
        }
    }
`;