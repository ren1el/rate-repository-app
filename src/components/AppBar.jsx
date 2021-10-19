import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.grey,
    paddingLeft: 15,
    height: 100,
    display: 'flex',
    justifyContent: 'center',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Text color={'white'} fontWeight={'bold'} fontSize={'subheading'}>Repositories</Text>
    </View>
  );
};

export default AppBar;