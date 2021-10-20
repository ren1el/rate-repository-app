import React from 'react';
import { View, Text, Image } from 'react-native';
import theme from '../theme';

const RepositoryInfo = ({ ownerAvatarUrl, fullName, description, language }) => {
  const styles = {
    descriptionContainer: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 20,
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 5,
    },
    summaryContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      minHeight: 90,
      flex: 1,
      marginLeft: 10,
    },
    title: {
      fontSize: theme.fontSizes.subheading,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    description: {
      fontSize: theme.fontSizes.body,
      marginBottom: 10,
    },
    language: {
      color: theme.colors.white,
      backgroundColor: theme.colors.primary,
      alignSelf: 'flex-start',
      padding: 5,
      fontSize: theme.fontSizes.body,
      borderRadius: 5,
      overflow: 'hidden',
    },
  };

  return (
      <View style={styles.descriptionContainer}>
        <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.summaryContainer}>
          <Text style={styles.title}>{fullName}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.language}>{language}</Text>
        </View>
      </View>
  );
};

const DataSnippet = ({ label, count }) => {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'flex-start',
      minHeight: 48,
    },
    count: {
      fontWeight: 'bold',
      fontSize: theme.fontSizes.body
    },
    label: {
      fontSize: theme.fontSizes.body
    },
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  const styles = {
    mainContainer: {
      padding: 20,
    },
    data: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  };

  return (
    <View style={styles.mainContainer}>
      <RepositoryInfo 
        ownerAvatarUrl={item.ownerAvatarUrl} 
        fullName={item.fullName}
        description={item.description}
        language={item.language}
      />
      <View style={styles.data}>
        <DataSnippet label={<Text>Stars</Text>} count={item.stargazersCount} />
        <DataSnippet label={<Text>Forks</Text>} count={item.forksCount} />
        <DataSnippet label={<Text>Reviews</Text>} count={item.reviewCount} />
        <DataSnippet label={<Text>Rating</Text>} count={item.ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;