import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { RNCamera } from 'react-native-camera';

export const CodeScanner = ({ navigation }) => {
  const [barCodes, setBarCodes] = useState([]);
  const [renderMe, setRenderMe] = useState(true);
  handleBarcodeDetection = barcode => {
    if (barcode.data.startsWith('logoed://')) {
      setRenderMe(false);
      const route = barcode.data.replace(/.*?:\/\//g, '');
      navigation.push('Logoing', { business: route });
    }
  };
  return (
    <>
      {renderMe ? (
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
            onGoogleVisionBarcodesDetected={result => {
              if (result.barcodes.length !== 0) {
                handleBarcodeDetection(result.barcodes[0]);
              }
            }}
          />
        </View>
      ) : null}
    </>
  );
};
