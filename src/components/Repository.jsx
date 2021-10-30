import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import theme from '../theme';
import RepositoryItem from './RepositoryItem';

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
        <Text style={styles.username}>{review.user.username}</Text>
        <Text style={styles.reviewDateText}>{new Date(review.createdAt).toString()}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const ItemSeparator = () => {
  const styles = StyleSheet.create({
    separator: {
      height: 10,
      backgroundColor: theme.colors.silver,
    },
  });

  return <View style={styles.separator} />;
};

const Repository = () => {
  const params = useParams();
  const id = params.id;

  const { repository, fetchMore } = useRepository(id, 4);
  const reviewNodes = repository.reviews ? repository.reviews.edges.map(edge => edge.node) : [];

  const renderItem = ({ item }) => <ReviewItem id={item.id} review={item} />;

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <View style={{ flex: 1 }}>
      <RepositoryItem item={repository} showExternalButton />
      <ItemSeparator />
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        style={{ flex: 1 }}
        onEndReached={onEndReach}
      />
    </View>
  );
};

export default Repository;