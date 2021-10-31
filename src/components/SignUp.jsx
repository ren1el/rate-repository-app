import { Formik } from 'formik';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';
import useCreateUser from '../hooks/useCreateUser';

const FormContainer = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
    passwordConfirm: '',
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required'),
    passwordConfirm: yup
      .string()
      .required('Password confirmation is required'),
  });

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
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <FormikTextInput
        name='username'
        placeholder='Username'
        style={styles.field}
        testID="username" />
      <FormikTextInput
        name='password'
        placeholder='Password'
        style={styles.field}
        testID="password"
        secureTextEntry />
      <FormikTextInput
        name='passwordConfirm'
        placeholder='Password confirmation'
        style={styles.field}
        testID="passwordConfirm"
        secureTextEntry />
      <Pressable style={styles.button} onPress={onSubmit} testID="submitButton">
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useCreateUser();
  const history = useHistory();

  const onSubmit = async (values) => {
    try {
      await signUp(values);
      history.push('/sign-in');
    } catch (error) {
      console.log(error);
    }
  };

  return <FormContainer onSubmit={onSubmit} />;
};

export default SignUp;