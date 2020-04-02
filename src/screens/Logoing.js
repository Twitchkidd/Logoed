import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import {
  ActivityIndicator,
  CameraRoll,
  ClipBoard,
  Dimensions,
  Image,
  Linking,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CenteringView } from '../components';
import { restaurants } from '../data';
import { RNCamera } from 'react-native-camera';
import ViewShot from 'react-native-view-shot';
import Draggable from 'react-native-draggable';
import {
  crayGray,
  eigengrau,
  lightOrange,
  darkOrange,
  mostlyWhite,
  maroon,
} from '../utils';

export const Logoing = ({ navigation, route }) => {
  const { business } = route.params;
  const restaurant = restaurants.filter(item => item.name === business);
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [snapShot, setSnapShot] = useState(null);
  const [pending, setPending] = useState(true);
  const camera = useRef();
  const viewShot = useRef();
  const { width } = Dimensions.get('window');
  const setXY = (e, gestureState) => {
    setX(x + Math.round(gestureState.dx));
    setY(y + Math.round(gestureState.dy));
  };
  const takeSnapShot = async camera => {
    const options = { quality: 1.0, base64: true };
    const data = await camera.takePictureAsync(options);
    console.log(data.uri);
    setSnapShot(data.uri);
    setPending(false);
  };
  const saveImage = () => {
    CameraRoll.saveToCameraRoll(viewShot)
      .then(() => console.log('camera roll save success!'))
      .catch(err => console.log(err));
  };
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: eigengrau,
        }}>
        {pending ? (
          <RNCamera
            ref={camera}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message:
                'Please give Logoed permission to use the camera while the app is open!',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            captureAudio={false}
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            {({ camera, status }) => {
              if (status !== 'READY')
                return (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <ActivityIndicator
                      size="large"
                      color={maroon}
                      animating={true}
                    />
                  </View>
                );
              return (
                <View
                  style={{
                    flex: 0,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      flex: 0,
                      alignSelf: 'center',
                      height: 80,
                      width: 80,
                      backgroundColor: `${mostlyWhite}`,
                      borderColor: crayGray,
                      borderWidth: 2,
                      borderRadius: 40,
                      zIndex: 90,
                    }}
                    onPress={() => takeSnapShot(camera)}>
                    <Text>Boop</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          </RNCamera>
        ) : (
          <ViewShot ref={viewShot}>
            <Image source={{ uri: snapShot }} />
          </ViewShot>
        )}
      </View>
      <Draggable
        x={x}
        y={y}
        z={2}
        onDragRelease={(e, gestureState) => setXY(e, gestureState)}
        imageSource={restaurant.logo}
        renderSize={width / 3}
      />
    </>
  );
};
