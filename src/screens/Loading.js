import React from 'react';
import { View, Text } from 'react-native';
import { CenteringView } from '../components';
import { lightGray, eigengrau } from '../utils';

export const Loading = () => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <View
      style={{
        width: 300,
        height: 200,
        borderColor: lightGray,
        borderWidth: 4,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
      }}>
      <Text style={{ fontSize: 20, color: eigengrau, textAlign: 'center' }}>
        Please sign up/sign in with Auth0 to use the app!
      </Text>
    </View>
  </View>
);
