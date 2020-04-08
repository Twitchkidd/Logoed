import React, { useState } from 'react';
import { Button, Linking, Text } from 'react-native';
import { CenteringView } from '../components';

export const ShareIt = ({ navigation, route }) => {
  const [pendingGoingToInstagram, setPendingGoingToInstagram] = useState(true);
  const { viewShot } = route.params;
  const goToInstagram = () => {
    const instagramURL = `instagram://library?AssetPath=${viewShot}`;
    setPendingGoingToInstagram(false);
    Linking.openURL(instagramURL);
  };
  const checkIfWeDidIt = () => {
    navigation.navigate('Modal', {
      type: 'postChecker',
      viewShot,
    });
  };
  return (
    <CenteringView>
      <Text
        style={{
          fontSize: 20,
          maxWidth: 340,
          paddingBottom: 20,
          textAlign: 'center',
        }}>
        Please post the Logoed photo to Instagram with the copied caption to
        enter the raffle!
      </Text>
      <Button title="Okay! To Instagram!" onPress={() => goToInstagram()} />
      {pendingGoingToInstagram ? null : (
        <Button
          title="Okay! Posted With Caption!"
          onPress={() => checkIfWeDidIt()}
        />
      )}
    </CenteringView>
  );
};
