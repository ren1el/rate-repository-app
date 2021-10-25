import React from 'react';
import { render } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);

      const repositoryItems = getAllByTestId('repositoryItem');
      const dataSnippets = getAllByTestId('dataSnippet');
      expect(repositoryItems).toHaveLength(2);

      expect(repositoryItems[0]).toHaveTextContent(
        repositories.edges[0].node.fullName
      );
      expect(repositoryItems[0]).toHaveTextContent(
        repositories.edges[0].node.description
      );
      expect(repositoryItems[0]).toHaveTextContent(
        repositories.edges[0].node.language
      );
      expect(dataSnippets[0]).toHaveTextContent(repositories.edges[0].node.stargazersCount.toString());
      expect(dataSnippets[1]).toHaveTextContent(repositories.edges[0].node.forksCount.toString());
      expect(dataSnippets[2]).toHaveTextContent(repositories.edges[0].node.reviewCount.toString());
      expect(dataSnippets[3]).toHaveTextContent(repositories.edges[0].node.ratingAverage.toString());

      expect(repositoryItems[1]).toHaveTextContent(
        repositories.edges[1].node.fullName
      );
      expect(repositoryItems[1]).toHaveTextContent(
        repositories.edges[1].node.description
      );
      expect(repositoryItems[1]).toHaveTextContent(
        repositories.edges[1].node.language
      );
      expect(dataSnippets[4]).toHaveTextContent(repositories.edges[1].node.stargazersCount.toString());
      expect(dataSnippets[5]).toHaveTextContent(repositories.edges[1].node.forksCount.toString());
      expect(dataSnippets[6]).toHaveTextContent(repositories.edges[1].node.reviewCount.toString());
      expect(dataSnippets[7]).toHaveTextContent(repositories.edges[1].node.ratingAverage.toString());
    });
  });
});