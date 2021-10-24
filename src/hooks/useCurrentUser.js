import { GET_CURRENT_USER } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useCurrentUser = () => {
  const { data, error, loading } = useQuery(GET_CURRENT_USER);

  return { user: data ? data.authorizedUser : null, error, loading };
};

export default useCurrentUser;