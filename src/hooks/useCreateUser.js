import { useApolloClient, useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const apolloClient = useApolloClient();

  const signUp = async (createUserInput) => {
    const { username, password } = createUserInput;

    await mutate({
      variables: {
        user: {
          username,
          password
        }
      },
    });

    apolloClient.resetStore();
  };

  return [signUp, result];
};

export default useCreateUser;