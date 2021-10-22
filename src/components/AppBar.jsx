import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import { Link } from 'react-router-native';

const Tab = ({ label, path }) => {
  const styles = StyleSheet.create({
    container: {
      marginRight: 15,
    },
    label: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: theme.fontSizes.subheading,
    }
  });

  return (
    <Pressable style={styles.container}>
      <Link to={path}>
        <Text style={styles.label}>
          {label}
        </Text>
      </Link>
    </Pressable>
  );
};

const AppBar = () => {
  const styles = StyleSheet.create({
    container: {
      paddingTop: Constants.statusBarHeight,
      backgroundColor: theme.colors.grey,
      paddingLeft: 15,
      height: 100,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Tab label={'Repositories'} path={'/'} />
        <Tab label={'Sign In'} path={'/sign-in'} />
      </ScrollView>
    </View>
  );
};

export default AppBar;