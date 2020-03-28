import React from 'react';
import { SafeAreaView } from 'react-native';

export const CenteringView = ({ children }) => (
  <SafeAreaView
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    }}>
    {children}
  </SafeAreaView>
);
