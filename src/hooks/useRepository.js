import { GET_REPOSITORY } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepository = (id, first) => {
  const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
      fetchPolicy: 'cache-and-network',
      variables: { id, first },
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews?.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        id,
        first,
      }
    });
  };

  return {
    repository: data ? data.repository : {}, 
    error,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepository;