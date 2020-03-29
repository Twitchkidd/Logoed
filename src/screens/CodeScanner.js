import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { RNCamera } from 'react-native-camera';

export const CodeScanner = ({ navigation }) => {
  const [barCodes, setBarCodes] = useState([]);
  useEffect(() => {
    // if barCodes includes url that starts with logoed://, get the last bit, try navigating there,
    // if that fails, navigate back to the business select screen and pop an alert that says reading the barcode failed
    // if barCodes[1]
  }, [barCodes]);
  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        captureAudio={false}
        style={{ flex: 1 }}
        type="back"
        autofocus={'on'}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message:
            'Please give Logoed permission to use the camera while the app is on. Thank you!',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={res => console.log('ayy!', res)}
      />
    </View>
  );
};
