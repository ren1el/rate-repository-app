import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import useCurrentUser from '../hooks/useCurrentUser';
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
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewInfo}>
        <Text style={styles.username}>{review.repository.ownerName}/{review.repository.name}</Text>
        <Text style={styles.reviewDateText}>{new Date(review.createdAt).toString()}</Text>
        <Text>{review.text}</Text>
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