import { gql } from '@apollo/client';

export const AUTHORIZE = gql`
  mutation signIn($credentials: AuthorizeInput) {
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview($review: CreateReviewInput) {
    createReview(review: $review) {
      repositoryId
    }
  }
`;