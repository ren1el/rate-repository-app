import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = (options) => {
  const latestOption = { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
  const highestRatedOption = { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
  const lowestRatedOption = { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
  let option = {};

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

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
      fetchPolicy: 'cache-and-network',
      variables: option,
  });

  return { repositories: data ? data.repositories : undefined, loading, error };
};

export default useRepositories;