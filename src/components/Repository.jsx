import React from 'react';
import { View } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';

const Repository = () => {
  const params = useParams();
  const id = params.id;

  const { repository } = useRepository(id);

  return (
    <View>
      <RepositoryItem item={repository} showExternalButton />
    </View>
  );
};

export default Repository;