import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Picker } from 'react-native';
import theme from '../theme';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce/lib';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.silver,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  repositoryNodes = (repositories) => repositories ? repositories.edges.map(edge => edge.node): []

  renderHeader = () => {
    const { searchQuery, setSearchQuery, orderOptions, setOrderOptions } = this.props;

    return (
      <>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <RepoOrderPicker
          orderOptions={orderOptions}
          setOrderOptions={setOrderOptions} />
      </>
    );
  };

  renderItem = ({ item }) => <RepositoryItem id={item.id} item={item} />;

  render() {
    return (
      <FlatList
        style={{ flex: 1 }}
        data={this.repositoryNodes(this.props.repositories)}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={this.renderItem}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepoOrderPicker = ({ orderOptions, setOrderOptions }) => (
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
);

const RepositoryList = () => {
  const [orderOptions, setOrderOptions] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedKeyword] = useDebounce(searchQuery, 500);
  const { repositories, fetchMore } = useRepositories(orderOptions, debouncedKeyword, 4);

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
      orderOptions={orderOptions}
      setOrderOptions={setOrderOptions}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
};

export default RepositoryList;