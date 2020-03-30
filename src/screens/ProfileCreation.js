import React, { useState, useContext } from 'react';
import { ProfileCreationContext } from '../contexts';
import { ActivityIndicator, Button, Platform, Text, View } from 'react-native';
import { CenteringView, TextInput } from '../components';

export const ProfileCreation = ({ navigation }) => {
  const [textHasBeenChanged, setTextHasBeenChanged] = useState(false);
  const [potentialInstagramHandle, setPotentialInstagramHandle] = useState(
    'YourAwesomeInsta!',
  );
  const [instagramHandle, setInstagramHandle] = useContext(
    ProfileCreationContext,
  );
  const yeap = () => {
    setInstagramHandle(potentialInstagramHandle);
  };
  const nope = () => {
    setPotentialInstagramHandle('YourAwesomeInsta!');
    setTextHasBeenChanged(false);
  };
  const handleFormSubmit = () => {
    navigation.navigate('Modal', {
      type: 'instagramHandleChecker',
      handle: potentialInstagramHandle,
      yeap,
      nope,
    });
  };
  return (
    <CenteringView>
      <Text style={{ textAlign: 'center' }}>What's your Instagram handle?</Text>
      <View>
        <TextInput
          onChangeText={text => {
            setTextHasBeenChanged(true);
            setPotentialInstagramHandle(text);
          }}
          value={potentialInstagramHandle}
        />
        <Button
          disabled={!textHasBeenChanged}
          onPress={handleSubmit}
          title="Submit"
        />
      </View>
    </CenteringView>
  );
};
