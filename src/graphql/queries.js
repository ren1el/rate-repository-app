import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id,
          ownerAvatarUrl,
          fullName,
          description,
          language,
          stargazersCount,
          forksCount,
          url,
          reviewCount,
          ratingAverage
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query getRepository($id: ID!) {
    repository(id: $id) {
      id,
      ownerAvatarUrl,
      name,
      fullName,
      description,
      language,
      stargazersCount,
      forksCount,
      url,
      reviewCount,
      ratingAverage
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    authorizedUser {
      id,
      username,
    }
  }
`;