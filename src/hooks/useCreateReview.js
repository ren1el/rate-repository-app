import { useApolloClient, useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const apolloClient = useApolloClient();

  const createReview = async (createReviewInput) => {
    const { ownerName, rating, repoName, review } = createReviewInput;

    const { data } = await mutate({
      variables: {
        review: {
          repositoryName: repoName,
          ownerName,
          rating: Number.parseInt(rating),
          text: review,
        },
      },
    });

    apolloClient.resetStore();
    return data ? data.createReview.repositoryId : undefined;
  };

  return [createReview, result];
};

export default useCreateReview;