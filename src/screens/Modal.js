import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export const Modal = ({ navigation, route }) => {
  const { type } = route.params;
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
            onPress={() =>
              navigation.navigate('ProfileCreation', { response: 'yeap' })
            }>
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
