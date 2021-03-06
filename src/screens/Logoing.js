import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import {
  ActivityIndicator,
  Animated,
  Button,
  ClipBoard,
  Dimensions,
  Image,
  Linking,
  PixelRatio,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CenteringView } from '../components';
import { RNCamera } from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';
import ViewShot from 'react-native-view-shot';
import Draggable from 'react-native-draggable';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  crayGray,
  eigengrau,
  lightOrange,
  darkOrange,
  mostlyWhite,
  maroon,
} from '../utils';
import { restaurants } from '../data';

const PendingCamera = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <ActivityIndicator size="large" color={maroon} animating={true} />
  </View>
);

const Shutter = props => (
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
    onPress={props.onPress}
  />
);

export const Logoing = ({ navigation, route }) => {
  const { business } = route.params;
  const restaurant = restaurants.filter(item => item.name === business)[0];
  const [x, setX] = useState(46);
  const [y, setY] = useState(786);
  const [modalin, setModalin] = useState(false);
  const [cameraPermission, setCameraPermission] = useState('');
  const [pendingDrag, setPendingDrag] = useState(true);
  const [pendingSnapShot, setPendingSnapShot] = useState(true);
  const [snapShot, setSnapShot] = useState(null);
  /*
    Okay, initially, we're not modalin, no camera permission, waiting on a drag, and we're waiting on a snapshot.
    First we get permission, and we're modalin.
    Then we're done modalin and we're waiting on a drag and a snapshot.
    Then we're either waiting for a drag or a snapshot.
    In the case of waiting for a drag, we've taken a snapshot.
    In the case of waiting for a snapshot, we're waiting for a drag.
    Then we're waiting for an okay?
    No, in the case of waiting for a drag, then we're waiting for an okay.
    In the case of waiting for a snapshot, surely the taking of the snapshot with a logo in place is the okay.
    Sigh ... for the presentation, we're just going to show the drag first flow. This needs to get __done.__
  */
  const pixelRatio = PixelRatio.get();
  const { width, height } = Dimensions.get('window');
  const camera = useRef();
  const viewShot = useRef();
  const infoBoxLeftZoomAnim = useRef(new Animated.Value(width)).current;
  const infoBoxBottomZoomAnim = useRef(new Animated.Value(height)).current;
  const infoBoxFadeAnim = useRef(new Animated.Value(0)).current;
  const iconFadeAnim = useRef(new Animated.Value(1)).current;
  const infoBoxZoomInLeft = () => {
    Animated.timing(infoBoxLeftZoomAnim, {
      toValue: 0,
      duration: 200,
    }).start();
  };
  const infoBoxZoomOutLeft = () => {
    Animated.timing(infoBoxLeftZoomAnim, {
      toValue: width,
      duration: 500,
    }).start();
  };
  const infoBoxZoomInBottom = () => {
    Animated.timing(infoBoxBottomZoomAnim, {
      toValue: 0,
      duration: 200,
    }).start();
  };
  const infoBoxZoomOutBottom = () => {
    Animated.timing(infoBoxBottomZoomAnim, {
      toValue: height,
      duration: 500,
    }).start();
  };
  const infoBoxFadeIn = () => {
    Animated.timing(infoBoxFadeAnim, {
      toValue: 1,
      duration: 200,
    }).start();
  };
  const infoBoxFadeOut = () => {
    Animated.timing(infoBoxFadeAnim, {
      toValue: 0,
      duration: 500,
    }).start();
  };
  const iconFadeIn = () => {
    Animated.timing(iconFadeAnim, {
      toValue: 1,
      duration: 200,
    }).start();
  };
  const iconFadeOut = () => {
    Animated.timing(iconFadeAnim, {
      toValue: 0,
      duration: 200,
    }).start();
  };
  const setXY = (e, gestureState) => {
    setX(x + gestureState.dx / pixelRatio);
    setY(y + gestureState.dy / pixelRatio);
    setPendingDrag(false);
  };
  const takeSnapShot = async camera => {
    const options = { quality: 1.0, base64: true };
    const data = await camera.takePictureAsync(options);
    setSnapShot(data.uri);
    setPendingSnapShot(false);
  };
  const saveImage = () => {
    viewShot.current
      .capture()
      .then(uri => {
        CameraRoll.saveToCameraRoll(uri)
          .then(() => {
            navigation.push('CopyCaption', { restaurant, viewShot: uri });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    if (cameraPermission === 'READY') {
      setModalin(true);
    }
  }, [cameraPermission]);
  useEffect(() => {
    if (!pendingSnapShot) {
      setTimeout(() => {
        saveImage();
      }, 40);
    }
  }, [pendingSnapShot]);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: eigengrau,
      }}>
      {pendingSnapShot ? (
        <>
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
              if (status !== 'READY') return <PendingCamera />;
              setCameraPermission(status);
              return (
                <View
                  style={{
                    flex: 0,
                    flexDirection: 'row',
                    width: width,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginBottom: 40,
                  }}>
                  <View
                    style={{
                      height: 20,
                      width: 20,
                      opacity: 0,
                    }}
                  />
                  <Shutter onPress={() => takeSnapShot(camera)}>
                    <View />
                  </Shutter>
                  <Animated.View style={{ width: 20, opacity: iconFadeAnim }}>
                    <TouchableOpacity onPress={() => setModalin(true)}>
                      <Icon name="ios-help" size={75} color={darkOrange} />
                    </TouchableOpacity>
                  </Animated.View>
                </View>
              );
            }}
          </RNCamera>
          {pendingDrag ? (
            <Draggable
              x={x}
              y={y}
              z={3}
              onDragRelease={(e, gestureState) => setXY(e, gestureState)}
              imageSource={restaurant.logo}
              renderSize={60}
            />
          ) : (
            <Draggable
              x={x}
              y={y}
              z={3}
              onDragRelease={(e, gestureState) => setXY(e, gestureState)}
              imageSource={restaurant.logo}
              renderSize={width / 3}
            />
          )}
          <Modal
            isVisible={modalin}
            onBackdropPress={() => setModalin(false)}
            animationInTiming={100}
            animationOutTiming={1000}
            backdropOpacity={0.6}
            onModalShow={() => {
              iconFadeOut();
              infoBoxZoomInBottom();
              infoBoxZoomInLeft();
              infoBoxFadeIn();
            }}
            onModalWillHide={() => {
              infoBoxZoomOutBottom();
              infoBoxZoomOutLeft();
              infoBoxFadeOut();
              iconFadeIn();
            }}
            style={{ alignItems: 'center' }}>
            <Animated.View
              style={{
                height: height / 3,
                width: width - 80,
                backgroundColor: mostlyWhite,
                borderRadius: 8,
                borderWidth: 4,
                borderColor: lightOrange,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: infoBoxBottomZoomAnim,
                marginLeft: infoBoxLeftZoomAnim,
                opacity: infoBoxFadeAnim,
              }}>
              <View style={{ width: width - 140, padding: 20 }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: eigengrau,
                    textAlign: 'center',
                  }}>
                  {pendingDrag
                    ? `Take a picture of your meal at ${
                        restaurant.name
                      } and drag the logo into place!`
                    : `Take a picture of your meal at ${
                        restaurant.name
                      } to continue!`}
                </Text>
              </View>
              <Button title="Okay!" onPress={() => setModalin(false)} />
            </Animated.View>
          </Modal>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ViewShot ref={viewShot} options={{ format: 'jpg', quality: 1.0 }}>
            <Image
              source={{ uri: snapShot }}
              style={{ width: width, height: height }}
            />
            <Image
              source={restaurant.logo}
              style={{
                position: 'absolute',
                top: y - (786 - y) * pixelRatio,
                left: x - (46 - x) * pixelRatio,
                width: width / 3,
                height: width / 3,
              }}
              resizeMode="stretch"
            />
          </ViewShot>
        </View>
      )}
    </View>
  );
};
