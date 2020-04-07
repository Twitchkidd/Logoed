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
import { eigengrau, crayGray } from '../utils';

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
        <Text style={{ fontSize: 24, textAlign: 'center', paddingBottom: 12 }}>
          Just your Instagram handle!
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
          style={{
            color: inputHasBeenFocusedOn ? eigengrau : crayGray,
            marginBottom: 16,
          }}
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
