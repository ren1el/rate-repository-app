import { GET_CURRENT_USER } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useCurrentUser = (options) => {
  const { data, error, loading } = useQuery(GET_CURRENT_USER, {
    variables: {
      includeReviews: options?.includeReviews ? true : false,
    }
  });

  return {
    user: data ? data.authorizedUser : null,
    reviews: data ? data.authorizedUser.reviews : null,
    error,
    loading };
};

export default useCurrentUser;