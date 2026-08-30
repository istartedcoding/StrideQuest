import { Platform } from 'react-native';

export const palette = {
  ink: '#07111F',
  surface: '#0E1B2C',
  elevated: '#14243A',
  line: '#223652',
  text: '#F7FAFC',
  muted: '#91A3BA',
  accent: '#FF6B45',
  accentSoft: '#FF9A62',
  lime: '#B7F36B',
  cyan: '#4DDBE8',
  warning: '#FFC857',
  danger: '#FF5F73',
  white: '#FFFFFF',
};

export const fonts = {
  display: Platform.select({ ios: 'Avenir Next', android: 'sans-serif', default: 'system-ui' }),
  mono: 'SpaceMono',
};

export const radius = { sm: 10, md: 16, lg: 24, pill: 999 };
export const spacing = { xs: 6, sm: 10, md: 16, lg: 24, xl: 32 };
