import React from 'react';
import { Text } from 'react-native';
import { CenteringView } from '../components';
import { restaurants } from '../data';
import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import ViewShot from 'react-native-view-shot';
import Draggable from 'react-native-draggable';

export const Logoing = ({ navigation, route }) => {
  return (
    <CenteringView>
      <Text>Logoing: {route.params.business}</Text>
    </CenteringView>
  );
};
