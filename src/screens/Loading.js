import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { CenteringView } from '../components';

export const Loading = () => (
  <CenteringView style={{ paddingBottom: 40 }}>
    <Text>Please log in using Auth0 to use the app!</Text>
  </CenteringView>
);
