import React from 'react';
import theme from '../theme';
import Text from './Text';

const SignIn = () => {
  const styles = {
    signIn: {
      color: theme.colors.textPrimary
    },
  };

  return <Text style={styles.signIn}>The sign in view</Text>;
};

export default SignIn;
