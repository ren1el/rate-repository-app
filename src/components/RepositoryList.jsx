import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Picker } from 'react-native';
import theme from '../theme';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.silver,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const renderItem = ({ item }) => (
    <>
      <RepositoryItem id={item.id} item={item} />
      <ItemSeparator />
    </>
  );

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      style={{ flex: 1 }}
    />
  );
};

const RepositoryList = () => {
  const [orderOptions, setOrderOptions] = useState('latest');
  const { repositories } = useRepositories(orderOptions);

  return (
    <View style={{ flex: 1 }}>
      <Picker
        selectedValue={orderOptions}
        onValueChange={(itemValue) => {
          setOrderOptions(itemValue);
        }}
      >
        <Picker.Item label="Latest Repositories" value='latest' />
        <Picker.Item label="Highest Rated Repositories" value='highestRated' />
        <Picker.Item label="Lowest Rated Repositories" value='lowestRated' />
      </Picker>
      <RepositoryListContainer repositories={repositories} />
    </View>
  );
};

export default RepositoryList;