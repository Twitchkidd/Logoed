import React, { PureComponent, createRef, Fragment } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image
} from "react-native";
import styled from "styled-components/native";
import { RNCamera } from "react-native-camera";
import RNFS from "react-native-fs";
import { Button, Draggable } from "../components";
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

const Shutter = styled(TouchableOpacity)`
  height: 80;
  width: 80;
  background-color: #ccc;
  border-radius: 40;
  border-color: #777;
  border-width: 2;
`;

export default class Logoing extends PureComponent {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.camera = createRef();
    this.logo = createRef();
  }
  state = {
    snapped: false,
    photo: null,
    x: 40,
    y: 80
  };
  toggleSnapped = () => {
    this.setState({ snapped: !this.state.snapped });
  };
  takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    console.log(data);
    console.log(data.uri);
    this.setState({ snapped: true, photo: data.uri });
  };
  setXY = (e, gestureState) => {
    this.setState({
      x: this.state.x + Math.round(gestureState.dx),
      y: this.state.y + Math.round(gestureState.dy)
    });
  };
  /*
  componentDidMount() {
    // get a list of files and directories in the main bundle
    RNFS.readDir(RNFS.LibraryDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then(result => {
        console.log("GOT RESULT", result);

        // stat the first file
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
      .then(statResult => {
        if (statResult[0].isFile()) {
          // if we have a file, read it
          return RNFS.readFile(statResult[1], "utf8");
        }
        return "no file";
      })
      .then(contents => {
        // log the file contents
        console.log(contents);
      })
      .catch(err => {
        console.log(err.message, err.code);
      });
  }
  */
  render() {
    const { width } = Dimensions.get("window");
    const { id } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        {this.state.snapped ? (
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: `${darkOrange}`,
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}>
            <Image
              source={{ uri: `${this.state.photo}`, width: 300, height: 300 }}
            />
            <Button
              onPress={() => this.toggleSnapped()}
              title='Back to camera!'
            />
          </View>
        ) : (
          <StyledRNCamera
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
                return <PendingView />;
              }
              return (
                <Fragment>
                  <View
                    style={{
                      position: "absolute",
                      top: 570,
                      zIndex: 200
                    }}>
                    <Shutter onPress={() => this.takePicture(camera)} />
                  </View>
                  <Draggable
                    renderShape='image'
                    imageSource={businesses[id].logo}
                    renderSize={width / 3}
                    ref={this.logo}
                    pressDragRelease={(e, gestureState) =>
                      this.setXY(e, gestureState)
                    }
                    x={this.state.x}
                    y={this.state.y}
                  />
                </Fragment>
              );
            }}
          </StyledRNCamera>
        )}
        {/*<View style={styles.actionBar} />*/}
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
    backgroundColor: lightOrange,
    zIndex: 1
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
