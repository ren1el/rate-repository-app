import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import { Link } from 'react-router-native';
import useCurrentUser from '../hooks/useCurrentUser';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

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

const SignOutTab = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

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
    <Pressable style={styles.container} onPress={signOut}>
      <Text style={styles.label}>
        Sign Out
      </Text>
    </Pressable>
  );
};

const AppBar = () => {
  const { user } = useCurrentUser();

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
        {!user && <Tab label={'Sign In'} path={'/sign-in'} />}
        {user && <SignOutTab />}
      </ScrollView>
    </View>
  );
};

export default AppBar;