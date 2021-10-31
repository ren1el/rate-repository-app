import React from 'react';
import Text from './Text';
import { Pressable, View, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';

const SignIn = () => {
  return (
    <View>
      <Authentication />
    </View>
  );
};

const Form = ({ onSubmit }) => {
  const styles = StyleSheet.create({
    container: {
      padding: 15,
      backgroundColor: theme.colors.white,
    },
    field: {
      borderWidth: 1,
      borderRadius: 5,
      padding: 20,
      borderColor: '#aaa',
    },
    button: {
      backgroundColor: theme.colors.primary,
      display: 'flex',
      alignItems: 'center',
      padding: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: theme.colors.white,
    },
  });

  return (
    <View style={styles.container}>
      <FormikTextInput name='username' placeholder='Username' style={styles.field} testID="usernameField" />
      <FormikTextInput name='password' placeholder='Password' secureTextEntry style={styles.field} testID="passwordField" />
      <Pressable style={styles.button} onPress={onSubmit} testID="submitButton">
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};


const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

export const AuthenticationContainer = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <Form onSubmit={handleSubmit} />}
    </Formik>
  );
};

const Authentication = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const initialValues = {
    username: '',
    password: '',
  };

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return <AuthenticationContainer initialValues={initialValues} onSubmit={onSubmit} />;
};

export default SignIn;
