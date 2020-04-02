import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ProfileCreationContext } from '../contexts';

export const Modal = ({ navigation, route }) => {
  const { type } = route.params;
  const [instagramHandle, setInstagramHandle] = useContext(
    ProfileCreationContext,
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {type === 'instagramHandleChecker' ? (
        <>
          <Text>Is this you? "{`${route.params.handle}`}"</Text>
          <TouchableOpacity
            style={{ backgroundColor: 'white', padding: 24 }}
            onPress={() => {
              setInstagramHandle(route.params.handle);
              setTimeout(() => {
                navigation.navigate('LogoingStack');
              }, 40);
            }}>
            <Text>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: 'white', padding: 24 }}
            onPress={() =>
              navigation.navigate('ProfileCreation', { response: 'nope' })
            }>
            <Text>No</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={{ backgroundColor: 'white', padding: 20 }}
          onPress={() => navigation.pop()}>
          <Text>Modal me</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
