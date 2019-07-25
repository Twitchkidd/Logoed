import React, { Component, createRef, Fragment } from "react";
import {
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  ActivityIndicator
} from "react-native";
import styled from "styled-components/native";
import { RNCamera } from "react-native-camera";
import ViewShot from "react-native-view-shot";
import { Button, P } from "../components";
import Draggable from "react-native-draggable";
import { eigengrau, lightOrange, darkOrange, mostlyWhite } from "../utilities";

const businesses = {
  Burgerology: {
    name: "Burgerology",
    logo: require("../logos/burgerology-logo.jpg"),
    handle: "@burgerologyny"
  },
  Jonathans: {
    name: "Jonathans",
    logo: require("../logos/jonathans-logo.png"),
    handle: "@jonathansrestaurantli"
  },
  Leilu: {
    name: "Leilu",
    logo: require("../logos/leilu-logo.png"),
    handle: "@leiluhuntington"
  }
};

const ScreenWrapper = styled(View)`
  flex: 1;
  flex-direction: column;
  background-color: ${eigengrau};
`;

const CameraAndImageWrapper = styled(View)`
  flex: 1;
  width: ${props => props.screenWidth};
  z-index: 1;
`;
//height: ${props => props.screenWidth};

const PendingView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
// TODO remove gesture to navigate back from logoing screen.
// TODO ... probably welcome too
// // position: relative;
const Camera = styled(RNCamera)`
  width: ${props => props.screenWidth};
  height: ${props => props.screenWidth};
`;

const Shutter = styled(TouchableOpacity)`
  position: absolute;
  top: 570;
  z-index: 2;
  height: 80;
  width: 80;
  border-radius: 40;
  background-color: #ccc;
  border-color: #777;
  border-width: 2;
`;

const ActionBar = styled(View)`
  flex: 1;
  opacity: 0.5;
  width: ${props => props.screenWidth};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${lightOrange};
  z-index: 0;
`;

export default class Logoing extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.camera = createRef();
    this.viewShot = createRef();
    this.logo = createRef();
  }
  state = {
    pendingDraggedReady: true,
    pendingSnapShot: true,
    snapShot: null,
    viewShot: null,
    x: 40,
    y: 80
  };
  retake = () => {
    this.setState({ pendingSnapShot: true });
  };
  takeSnapShot = async camera => {
    const options = { quality: 1.0, base64: true };
    const data = await camera.takePictureAsync(options);
    this.setState({ pendingSnapShot: false, snapShot: data.uri });
  };
  takeViewShot = () => {
    this.viewShot.current
      .capture()
      .then(uri => {
        this.setState({ viewShot: uri });
      })
      .catch(err => {
        console.log(err);
      });
  };
  setXY = (e, gestureState) => {
    const { x, y } = this.state;
    this.setState({
      pendingDraggedReady: false,
      x: x + Math.round(gestureState.dx),
      y: y + Math.round(gestureState.dy)
    });
  };
  render() {
    const { width } = Dimensions.get("window");
    const {
      pendingDraggedReady,
      pendingSnapShot,
      snapShot,
      viewShot,
      x,
      y
    } = this.state;
    const { id } = this.props.navigation.state.params;
    console.log(this.state);
    return (
      <ScreenWrapper>
        <CameraAndImageWrapper screenWidth={width}>
          {pendingSnapShot ? (
            <Camera
              ref={this.camera}
              screenWidth={width}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.off}
              androidCameraPermissionOptions={{
                title: "Permission to use camera",
                message: "We need your permission to use your camera",
                buttonPositive: "Ok",
                buttonNegative: "Cancel"
              }}
              onGoogleVisionBarcodesDetected={({ barcodes }) => {
                console.log(barcodes);
              }}
              captureAudio={false}>
              {({ camera, status }) => {
                if (status !== "READY") {
                  return (
                    <PendingView>
                      <ActivityIndicator
                        size='large'
                        color='#8E293E'
                        animating={true}
                      />
                    </PendingView>
                  );
                } else {
                  return pendingDraggedReady ? null : (
                    <Shutter onPress={() => this.takeSnapShot(camera)} />
                  );
                }
              }}
            </Camera>
          ) : (
            <ViewShot ref={this.viewShot}>
              <Image source={{ uri: `${snapShot}`, width: 300, height: 300 }} />
            </ViewShot>
          )}
        </CameraAndImageWrapper>
        <Draggable
          ref={this.logo}
          x={x}
          y={y}
          pressDragRelease={(e, gestureState) => this.setXY(e, gestureState)}
          renderShape='image'
          imageSource={businesses[id].logo}
          renderSize={width / 3}
        />
        <ActionBar screenWidth={width}>
          {pendingDraggedReady ? (
            <P>Tap and drag to place logo!</P>
          ) : pendingSnapShot ? null : (
            <Fragment>
              <Button onPress={() => this.retake()} title='Back to camera!' />
              <Button
                onPress={() => this.takeViewShot()}
                title='Share to Instagram!'
              />
            </Fragment>
          )}
        </ActionBar>
      </ScreenWrapper>
    );
  }
}
