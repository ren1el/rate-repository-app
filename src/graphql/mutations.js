import { gql } from '@apollo/client';

export const AUTHORIZE = gql`
  mutation signIn($credentials: AuthorizeInput) {
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;