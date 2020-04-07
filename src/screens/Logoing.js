import React, { useState, useRef } from 'react';
import styled from 'styled-components/native';
import {
  ActivityIndicator,
  Animated,
  ClipBoard,
  Dimensions,
  Image,
  Linking,
  PixelRatio,
  StyleSheet,
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

const { width, height } = Dimensions.get('window');
console.log(width);
export const Logoing = ({ navigation, route }) => {
  const { business } = route.params;
  const restaurant = restaurants.filter(item => item.name === business)[0];
  const [x, setX] = useState(46);
  const [y, setY] = useState(786);
  const [iconVisible, setIconVisible] = useState(true);
  const [modalin, setModalin] = useState(true);
  const [pendingDrag, setPendingDrag] = useState(true);
  const [pendingSnapShot, setPendingSnapShot] = useState(true);
  const [snapShot, setSnapShot] = useState(null);
  const camera = useRef();
  const viewShot = useRef();
  const infoBoxZoomAnim = useRef(new Animated.Value(0)).current;
  const infoBoxFadeAnim = useRef(new Animated.Value(0)).current;
  const iconFadeAnim = useRef(new Animated.Value(1)).current;
  const pixelRatio = PixelRatio.get();
  const toggleIconAnim = () => {
    console.log('icon toggle');
    if (iconVisible) {
      setIconVisible(false);
      Animated.timing(iconFadeAnim, {
        toValue: 0,
        duration: 300,
      }).start();
    } else {
      setIconVisible(true);
      Animated.timing(iconFadeAnim, {
        toValue: 1,
        duration: 800,
      }).start();
    }
  };
  const animIn = () => {
    Animated.timing(infoBoxZoomAnim, {
      toValue: 0,
      duration: 500,
    }).start();
  };
  const fadeIn = () => {
    Animated.timing(infoBoxFadeAnim, {
      toValue: 1,
      duration: 500,
    }).start();
  };
  const animOut = () => {
    Animated.timing(infoBoxZoomAnim, {
      toValue: 500,
      duration: 500,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(infoBoxFadeAnim, {
      toValue: 0,
      duration: 500,
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
    saveImage();
  };
  const saveImage = () => {
    viewShot.current
      .capture()
      .then(uri => {
        CameraRoll.saveToCameraRoll(uri)
          .then(() => {
            console.log('camera roll save success!');
            // navigation.push('CopyCaption', { restaurant, viewShot: uri });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };
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
                    onLayout={event => {
                      const { x, y, width, height } = event.nativeEvent.layout;
                      console.log(x);
                      console.log(y);
                      console.log(width);
                      console.log(height);
                    }}
                  />
                  <Shutter onPress={() => takeSnapShot(camera)}>
                    <View />
                  </Shutter>
                  <Animated.View
                    style={{ opacity: iconFadeAnim }}
                    onLayout={event => {
                      const { width } = event.nativeEvent.layout;
                      console.log(width);
                      // set the width of the shadow element to this!
                    }}>
                    <TouchableOpacity onPress={() => toggleIconAnim()}>
                      <Icon name="ios-help" size={75} color={darkOrange} />
                    </TouchableOpacity>
                  </Animated.View>
                </View>
              );
            }}
          </RNCamera>
          <Draggable
            x={x}
            y={y}
            z={3}
            onDragRelease={(e, gestureState) => setXY(e, gestureState)}
            imageSource={restaurant.logo}
            // renderSize={width / 3}
            renderSize={60}
          />
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ViewShot ref={viewShot} options={{ format: 'jpg', quality: 1.0 }}>
            <Image
              source={{ uri: snapShot }}
              style={{ width: width, height: height }}
            />
            <Draggable
              x={x * pixelRatio}
              y={y * pixelRatio - 72}
              disabled
              z={3}
              onDragRelease={(e, gestureState) => setXY(e, gestureState)}
              imageSource={restaurant.logo}
              renderSize={width / 3}
            />
            <Shutter onPress={() => setModalin(true)}>
              <View />
            </Shutter>
          </ViewShot>
          <Modal
            isVisible={modalin}
            onBackdropPress={() => setModalin(false)}
            animationInTiming={500}
            animationOutTiming={500}
            backdropOpacity={0.6}
            onModalWillShow={() => {
              animIn();
              fadeIn();
            }}
            onModalWillHide={() => {
              animOut();
              fadeOut();
            }}
            style={{ alignItems: 'center' }}>
            <Animated.View
              style={[
                styles.infoBox,
                {
                  // marginBottom: infoBoxZoomAnim,
                  marginLeft: infoBoxZoomAnim,
                  opacity: infoBoxFadeAnim,
                },
              ]}>
              <Text style={{ fontSize: 20, color: eigengrau }}>AYY!!</Text>
            </Animated.View>
          </Modal>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoBox: {
    height: height / 3,
    width: width - 80,
    backgroundColor: mostlyWhite,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: lightOrange,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
