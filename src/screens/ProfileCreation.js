import React, { useState, useContext } from 'react';
import { ProfileCreationContext } from '../contexts';
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  Text,
  View,
} from 'react-native';
import { CenteringView, TextEntry } from '../components';
import { Formik } from 'formik';

export const ProfileCreation = ({ navigation }) => {
  // Do this first:
  const [potentialInstagramHandle, setPotentialInstagramHandle] = useState('');
  // Then this:
  const setInstagramHandle = useContext(ProfileCreationContext)[1];
  // ...
  const yeap = () => {
    console.log('yeap');
  };
  const nope = () => {
    console.log('nope');
  };
  const handleFormSubmit = instagramHandle => {
    setPotentialInstagramHandle(instagramHandle);
    navigation.navigate('Modal', {
      type: 'instagramHandleChecker',
      handle: instagramHandle,
      yeap,
      nope,
    });
  };
  return (
    <CenteringView>
      <Text>What's your Instagram handle?</Text>
      <Formik
        initialValues={{ instagramHandle: '' }}
        onSubmit={values => handleFormSubmit(values.instagramHandle)}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextEntry
              onChangeText={handleChange('instagramHandle')}
              onBlur={handleBlur('instagramHandle')}
              value={values.instagramHandle}
              placeHolder="your-awesome-instagram-handle!"
            />
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </CenteringView>
  );
};
