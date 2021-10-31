import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useHistory } from 'react-router-native';
import useCurrentUser from '../hooks/useCurrentUser';
import useDeleteReview from '../hooks/useDeleteReview';
import theme from '../theme';

const ReviewItem = ({ review }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.white,
      display: 'flex',
      flexDirection: 'row',
      padding: 10,
    },
    ratingContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.colors.primary,
      marginRight: 10,
    },
    ratingText: {
      fontSize: theme.fontSizes.body,
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
    reviewDateText: {
      color: theme.colors.grey,
      marginBottom: 5,
    },
    reviewInfo: {
      flex: 1,
    },
    username: {
      fontWeight: 'bold',
    },
    reviewText: {
      marginBottom: 5,
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      padding: 10,
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: theme.colors.white,
      borderRadius: 5,
    },
    viewRepoButton: {
      backgroundColor: theme.colors.primary,
      marginRight: 10,
    },
    deleteReviewButton: {
      backgroundColor: theme.colors.error,
    }
  });

  const [deleteReview] = useDeleteReview();
  const history = useHistory();

  const handleDelete = async () => {
    try {
      await deleteReview(review.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewInfo}>
        <Text style={styles.username}>{review.repository.ownerName}/{review.repository.name}</Text>
        <Text style={styles.reviewDateText}>{new Date(review.createdAt).toString()}</Text>
        <Text style={styles.reviewText}>{review.text}</Text>
        <View style={styles.buttonContainer}>
          <Pressable style={[styles.button, styles.viewRepoButton]} onPress={() => {history.push(`/repository/${review.repository.id}`);}}>
            <Text style={{ color: theme.colors.white }}>View Repository</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.deleteReviewButton]} onPress={handleDelete}>
            <Text style={{ color: theme.colors.white }}>Delete Review</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { reviews } = useCurrentUser({ includeReviews: true });
  const reviewNodes = reviews ? reviews.edges.map(edge => edge.node) : [];

  const ItemSeparator = () => {
    const styles = StyleSheet.create({
      separator: {
        height: 10,
        backgroundColor: theme.colors.silver,
      },
    });

    return <View style={styles.separator} />;
  };

  const renderItem = ({ item }) => <ReviewItem id={item.id} review={item} />;

  return (
    <View>
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
      />
    </View>
  );
};

export default MyReviews;