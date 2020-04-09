import React, { useState } from 'react';
import { Button, Linking, Text } from 'react-native';
import { CenteringView } from '../components';

export const ShareIt = ({ navigation, route }) => {
  const [pendingGoingToInstagram, setPendingGoingToInstagram] = useState(true);
  const { viewShot } = route.params;
  const goToInstagram = () => {
    const instagramURL = `instagram://library?AssetPath=${viewShot}`;
    Linking.openURL(instagramURL);
    setTimeout(() => {
      setPendingGoingToInstagram(false);
    }, 2000);
  };
  const checkIfWeDidIt = () => {
    // navigation.navigate('Modal', {
    //   type: 'postChecker',
    //   viewShot,
    // });
    navigation.navigate('AppDrawer', { screen: 'Home', params: { viewShot } });
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
        Alright, post the Logoed photo to Instagram with the caption that's
        copied to the clipboard and enter the raffle!
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
