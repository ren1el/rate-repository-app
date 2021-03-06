import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    white: '#fff',
    grey: '#24292e',
    silver: '#e1e4e8',
    error: '#9b0000',
  },
  fontSizes: {
    body: 18,
    subheading: 20,
  },
  fonts: {
    main: Platform.OS === 'ios' ? 'Arial' : 'Android',
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;