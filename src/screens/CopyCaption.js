import React, { useContext, useState } from 'react';
import { ProfileCreationContext } from '../contexts';
import { Button, Clipboard, Dimensions, Image, Text, View } from 'react-native';
import { CenteringView } from '../components';
import { blue, eigengrau } from '../utils';

export const CopyCaption = ({ navigation, route }) => {
  const [captionCopied, setCaptionCopied] = useState(false);
  const [instagramHandle] = useContext(ProfileCreationContext);
  const { restaurant, viewShot } = route.params;
  const { width, height } = Dimensions.get('window');
  const caption = `Yay! Delicious food at ${
    restaurant.handle
  }, and they're having a raffle! Thanks @LogoedApp!`;
  const copyCaption = () => {
    Clipboard.setString(caption);
    setCaptionCopied(true);
    navigation.push('ShareIt', { viewShot });
  };
  console.log(route.params.viewShot);
  return (
    <CenteringView>
      <Image
        source={{ uri: route.params.viewShot }}
        style={{ width: width, height: height, marginBottom: 8, opacity: 0.4 }}
      />
      <Text
        style={{
          paddingLeft: 8,
          paddingRight: 8,
          paddingBottom: 10,
          fontSize: 24,
          fontFamily: 'Helvetica Neue',
          color: eigengrau,
        }}>
        <Text style={{ fontWeight: 'bold' }}>{instagramHandle}</Text>
        {` `}Yay! Delicious food at{` `}
        <Text style={{ color: blue }}>{restaurant.handle}</Text>, and they're
        having a raffle! Thanks <Text style={{ color: blue }}>@LogoedApp</Text>
        <Text>!</Text>
      </Text>
      {captionCopied ? (
        <Text style={{ fontSize: 24 }}>Caption copied to clipboard!</Text>
      ) : null}
      <View>
        <Button title="Copy Caption" onPress={() => copyCaption()} />
      </View>
      <Text
        style={{
          fontSize: 20,
          width: 340,
          textAlign: 'center',
          color: eigengrau,
          marginTop: 8,
          marginBottom: height - 300,
        }}>
        Please copy the caption for the Instagram post so you can be properly
        entered in the raffle!
      </Text>
    </CenteringView>
  );
};
