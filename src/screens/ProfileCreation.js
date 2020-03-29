import React, { useState, useContext } from 'react';
import { ProfileCreationContext } from '../contexts';
import { ActivityIndicator, Button, Platform, Text, View } from 'react-native';
import { CenteringView, TextInput } from '../components';
import { Formik } from 'formik';

export const ProfileCreation = ({ navigation }) => {
  const [potentialInstagramHandle, setPotentialInstagramHandle] = useState('');
  const [instagramHandle, setInstagramHandle] = useContext(
    ProfileCreationContext,
  );
  const yeap = () => {
    console.log('yeap');
    console.log(potentialInstagramHandle);
    console.log(setInstagramHandle);
    setInstagramHandle(potentialInstagramHandle);
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
      <Text style={{ textAlign: 'center' }}>What's your Instagram handle?</Text>
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
