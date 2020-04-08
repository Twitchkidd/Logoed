import React, { useState, useEffect, useContext } from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ProfileCreationContext } from '../contexts';
import { maroon } from '../utils';

export const Modal = ({ navigation, route }) => {
  const { type } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [instagramHandle, setInstagramHandle] = useContext(
    ProfileCreationContext,
  );
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {type === 'instagramHandleChecker' ? (
        isLoading ? (
          <ActivityIndicator size="large" color={maroon} animating={true} />
        ) : (
          <>
            <Image
              source={{
                uri:
                  'https://scontent-lga3-1.cdninstagram.com/v/t51.2885-19/s150x150/60954884_521050915096043_7594453673497853952_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_ohc=L-VdjeU46_QAX_58xtW&oh=561aff92e20fda1e85052d9bdcc89fb3&oe=5EB06E44',
              }}
              style={{ width: 150, height: 150, borderRadius: 75 }}
            />
            <Text style={{ fontSize: 24, paddingTop: 8, paddingBottom: 16 }}>
              {route.params.handle}
            </Text>
            <Text style={{ fontSize: 20, padding: 16 }}>Is this you?</Text>
            <Button
              onPress={() => {
                setInstagramHandle(route.params.handle);
                setTimeout(() => {
                  navigation.navigate('LogoingStack');
                }, 60);
              }}
              title="Yes!"
            />
            <View style={{ margin: 8 }}>
              <Button
                onPress={() =>
                  navigation.navigate('ProfileCreation', { response: 'nope' })
                }
                title="No."
              />
            </View>
          </>
        )
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
