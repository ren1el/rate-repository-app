import { Formik } from 'formik';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import useCreateReview from '../hooks/useCreateReview';
import { useHistory } from 'react-router-native';

const FormContainer = ({ onSubmit }) => {
  const initialValues = {
    ownerName: '',
    repoName: '',
    rating: '',
    review: '',
  };

  const validationSchema = yup.object().shape({
    ownerName: yup
      .string()
      .required('Repository owner name is required'),
    repoName: yup
      .string()
      .required('Repository name is required'),
    rating: yup
      .number()
      .min(0)
      .max(100)
      .required('Rating is required'),
    review: yup
      .string(),
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
        name='ownerName'
        placeholder='Repository owner name'
        style={styles.field}
        testID="ownerNameField" />
      <FormikTextInput
        name='repoName'
        placeholder='Repository name'
        style={styles.field}
        testID="repoNameField" />
      <FormikTextInput
        name='rating'
        placeholder='Rating between 0 and 100'
        style={styles.field}
        testID="ratingField" />
      <FormikTextInput
        name='review'
        placeholder='Review'
        style={styles.field}
        testID="reviewField" />
      <Pressable style={styles.button} onPress={onSubmit} testID="submitButton">
        <Text style={styles.buttonText}>Create a Review</Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const history = useHistory();

  const onSubmit = async (values) => {
    try {
      const id = await createReview(values);
      history.push(`/repository/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return <FormContainer onSubmit={onSubmit} />;
};

export default CreateReview;