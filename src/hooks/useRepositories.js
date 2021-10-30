import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = (options, searchQuery, first) => {
  const latestOption = { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
  const highestRatedOption = { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
  const lowestRatedOption = { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
  let option = {};

  if (options) {
    switch(options) {
      case 'latest':
        option = latestOption;
        break;
      case 'highestRated':
        option = highestRatedOption;
        break;
      case 'lowestRated':
        option = lowestRatedOption;
        break;
      default:
        console.log('Unexpected useRepositories option');
        break;
    }
  }

  let searchKeyword = {};

  if (searchQuery) {
    searchKeyword = { searchKeyword: searchQuery };
  }

  const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
      fetchPolicy: 'cache-and-network',
      variables: { ...option, ...searchKeyword, first },
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...option,
        ...searchKeyword,
        ...first,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    error,
    loading,
    ...result,
  };
};

export default useRepositories;