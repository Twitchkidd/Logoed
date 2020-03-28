import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export const Modal = ({ navigation, route }) => {
  const { type } = route.params;
  console.log(type === 'instagramHandleChecker');
  console.log(route.params.yeap);
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
              route.params.yeap();
              navigation.pop();
            }}>
            <Text>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: 'white', padding: 24 }}
            onPress={() => {
              route.params.nope();
              navigation.pop();
            }}>
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
