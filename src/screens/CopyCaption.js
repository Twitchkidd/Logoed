import React, { useContext, useState } from 'react';
import { ProfileCreationContext } from '../contexts';
import { Button, Clipboard, Text } from 'react-native';
import { CenteringView } from '../components';

export const CopyCaption = ({ navigation, route }) => {
  const [captionCopied, setCaptionCopied] = useState(false);
  const [instagramHandle] = useContext(ProfileCreationContext)[0];
  const { restaurant, viewShot } = route.params;
  const caption = `Yay! Thanks ${restaurant.handle}! Check out @LogoedApp!`;
  const copyCaption = () => {
    Clipboard.setString(caption);
    setCaptionCopied(true);
    navigation.push('ShareIt', { viewShot });
  };
  return (
    <CenteringView>
      <Text style={{ maxWidth: 220, paddingBottom: 10 }}>
        {instagramHandle} {caption}
      </Text>
      <View>
        <Button
          title="Copy Caption"
          onPress={() => copyCaption()}
          disabled={captionCopied}
        />
      </View>
      <Text style={{ fontSize: 20, width: 340, textAlign: 'center' }}>
        Please copy the caption for the Instagram post to properly be entered in
        the raffle!
      </Text>
    </CenteringView>
  );
};
