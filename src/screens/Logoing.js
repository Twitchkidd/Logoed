import React, { PureComponent, createRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from "react-native";
import styled from "styled-components/native";
import { RNCamera } from "react-native-camera";
import { eigengrau, lightOrange } from "../utilities";

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: "lightgreen",
      justifyContent: "center",
      alignItems: "center"
    }}>
    <Text>Waiting</Text>
  </View>
);

const StyledRNCamera = styled(RNCamera)`
  height: ${props => props.screenWidth};
  justify-content: flex-end;
  align-items: center;
`;

export default class Logoing extends PureComponent {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.camera = createRef();
  }
  takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    console.log(data.uri);
  };
  render() {
    const { width } = Dimensions.get("window");
    return (
      <View style={styles.container}>
        <StyledRNCamera
          ref={this.camera}
          screenWidth={width}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
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
              return <PendingView />;
            }
            return (
              <View
                style={{
                  flex: 0,
                  flexDirection: "row",
                  justifyContent: "center"
                }}>
                <TouchableOpacity
                  onPress={() => this.takePicture(camera)}
                  style={styles.capture}>
                  <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </StyledRNCamera>
        <View style={styles.actionBar} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: eigengrau
  },
  preview: {
    height: 360,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  },
  actionBar: {
    flex: 1,
    backgroundColor: lightOrange
  }
});

/*

          androidRecordAudioPermissionOptions={{
            title: "Permission to use audio recording",
            message: "We need your permission to use your audio",
            buttonPositive: "Ok",
            buttonNegative: "Cancel"
          }}
          */
