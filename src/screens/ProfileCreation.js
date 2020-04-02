import React, { useState, useContext, useEffect } from 'react';
import {
  ActivityIndicator,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';
import { TextInput } from '../components';

export const ProfileCreation = ({ navigation, route }) => {
  const [inputHasBeenFocusedOn, setInputHasBeenFocusedOn] = useState(false);
  const [textHasBeenChanged, setTextHasBeenChanged] = useState(false);
  const [potentialInstagramHandle, setPotentialInstagramHandle] = useState(
    'YourAwesomeInsta!',
  );
  useEffect(() => {
    if (route.params) {
      if (route.params.response === 'nope') {
        setPotentialInstagramHandle('YourAwesomeInsta!');
        setInputHasBeenFocusedOn(false);
      }
    }
  }, [route.params]);
  const handleSubmit = () => {
    Keyboard.dismiss();
    navigation.navigate('Modal', {
      type: 'instagramHandleChecker',
      handle: potentialInstagramHandle,
    });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.Os === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Text style={{ textAlign: 'center' }}>
          What's your Instagram handle?
        </Text>
      </View>
      <View>
        <TextInput
          autocomplete={false}
          onFocus={() => {
            setInputHasBeenFocusedOn(true);
            setPotentialInstagramHandle('');
          }}
          onChangeText={text => {
            setPotentialInstagramHandle(text);
            if (text !== '') {
              setTextHasBeenChanged(true);
            }
          }}
          value={potentialInstagramHandle}
        />
        <Button
          disabled={!inputHasBeenFocusedOn || !textHasBeenChanged}
          onPress={handleSubmit}
          title="Submit"
        />
      </View>
    </KeyboardAvoidingView>
  );
};
