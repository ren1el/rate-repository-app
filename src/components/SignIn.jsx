import React from 'react';
import Text from './Text';
import { Pressable, View, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';

const SignIn = () => {
  const styles = {
    wrapper: {
      padding: 10,
    },
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.signIn}>The sign in view</Text>
      <Authentication />
    </View>
  );
};

const Form = ({ onSubmit }) => {
  const styles = StyleSheet.create({
    field: {
      borderWidth: 1,
      borderRadius: 5,
      padding: 20,
    }
  });

  return (
    <>
      <Text>Username</Text>
      <FormikTextInput name='username' placeholder='Username' style={styles.field} />
      <Text>Password</Text>
      <FormikTextInput name='password' placeholder='Password' secureTextEntry style={styles.field} />
      <Pressable onPress={onSubmit}>
        <Text>Sign In</Text>
      </Pressable>
    </>
  );
};


const Authentication = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <Form onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
