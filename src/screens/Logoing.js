import React from 'react';
import { Text } from 'react-native';
import { CenteringView } from '../components';

export const Logoing = ({ navigation, route }) => {
  return (
    <CenteringView>
      <Text>Logoing: {route.params.business}</Text>
    </CenteringView>
  );
};
