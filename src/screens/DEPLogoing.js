// import React, { Component, createRef, Fragment } from 'react';
// import {
//   TouchableOpacity,
//   View,
//   Dimensions,
//   Image,
//   ActivityIndicator,
//   Modal,
//   Clipboard,
//   CameraRoll,
//   Linking,
// } from 'react-native';
// import styled from 'styled-components/native';
// import { RNCamera } from 'react-native-camera';
// import ViewShot from 'react-native-view-shot';
// import { Button, P } from '../components';
// import Draggable from 'react-native-draggable';
// import ImagePicker from 'react-native-image-crop-picker';
// import { eigengrau, lightOrange, darkOrange, mostlyWhite } from '../utilities';

// const businesses = {
//   Burgerology: {
//     name: 'Burgerology',
//     logo: require('../logos/burgerology-logo.jpg'),
//     handle: '@burgerologyny',
//   },
//   Jonathans: {
//     name: 'Jonathans',
//     logo: require('../logos/jonathans-logo.png'),
//     handle: '@jonathansrestaurantli',
//   },
//   Leilu: {
//     name: 'Leilu',
//     logo: require('../logos/leilu-logo.png'),
//     handle: '@leiluhuntington',
//   },
// };

// const ScreenWrapper = styled(View)`
//   flex: 1;
//   flex-direction: column;
//   background-color: ${eigengrau};
// `;

// const Header = styled(View)`
//   flex: 0.2;
//   background-color: ${mostlyWhite};
// `;

// const CameraAndImageWrapper = styled(View)`
//   flex: 1;
//   width: ${props => props.screenWidth};
//   z-index: 1;
// `;

// const PendingView = styled(View)`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
// `;

// const Camera = styled(RNCamera)`
//   width: ${props => props.screenWidth};
//   height: ${props => props.screenWidth};
// `;

// const Shutter = styled(TouchableOpacity)`
//   position: absolute;
//   top: 570;
//   z-index: 2;
//   height: 80;
//   width: 80;
//   border-radius: 40;
//   background-color: #ccc;
//   border-color: #777;
//   border-width: 2;
// `;

// const ActionBar = styled(View)`
//   flex: 1;
//   opacity: 0.5;
//   width: ${props => props.screenWidth};
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   background-color: ${lightOrange};
//   z-index: 0;
// `;

// const CameraRollSelector = styled(TouchableOpacity)`
//   height: 41;
//   width: 41;
//   background-color: ${darkOrange};
// `;

// export default class Logoing extends Component {
//   static navigationOptions = {
//     header: null,
//   };
//   constructor(props) {
//     super(props);
//     this.camera = createRef();
//     this.viewShot = createRef();
//     this.logo = createRef();
//   }
//   state = {
//     pendingDraggedReady: true,
//     pendingSnapShot: true,
//     snapShot: null,
//     viewShot: null,
//     x: 40,
//     y: 80,
//     modalVisible: false,
//     caption: '',
//   };
//   retake = () => {
//     this.setState({ pendingSnapShot: true });
//   };
//   backToPreviousSnapShot = () => {
//     this.setState({ pendingSnapShot: false });
//   };
//   takeSnapShot = async camera => {
//     const options = { quality: 1.0, base64: true };
//     const data = await camera.takePictureAsync(options);
//     this.setState({
//       pendingSnapShot: false,
//       snapShot: data.uri,
//       caption: `Ate at ${businesses[id].handle} and used @logoedapp to enter to win a raffle! Come on down!`,
//     });
//   };
//   selectFromCameraRoll = () => {
//     ImagePicker.openPicker({
//       width: 300,
//       height: 400,
//     })
//       .then(image => {
//         this.setState({
//           snapShot: image,
//           caption: `Ate at ${businesses[id].handle} and used @logoedapp to enter to win a raffle! Come on down!`,
//         });
//       })
//       .catch(err => console.log(err));
//   };
//   takeViewShot = () => {
//     this.viewShot.current
//       .capture()
//       .then(uri => {
//         this.setState({ viewShot: uri });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };
//   setXY = (e, gestureState) => {
//     const { x, y } = this.state;
//     this.setState({
//       pendingDraggedReady: false,
//       x: x + Math.round(gestureState.dx),
//       y: y + Math.round(gestureState.dy),
//     });
//   };
//   popModal = () => {
//     const { caption } = this.state;
//     this.takeViewShot();
//     this.setState({ modalVisible: true });
//     Clipboard.setString(caption);
//   };
//   handleModalRequestClose = () => {
//     this.setState({ modalVisible: false });
//   };
//   share = () => {
//     const { viewShot } = this.state;
//     console.log('share');
//     CameraRoll.saveToCameraRoll(viewShot)
//       .then(() => console.log('camera roll save success!'))
//       .catch(err => console.log(err));
//     let instagramURL = `instagram://library?AssetPath=${viewShot}`;
//     Linking.openURL(instagramURL);
//   };
//   render() {
//     const { width } = Dimensions.get('window');
//     const {
//       pendingDraggedReady,
//       pendingSnapShot,
//       snapShot,
//       viewShot,
//       x,
//       y,
//       modalVisible,
//       caption,
//     } = this.state;
//     const { id } = this.props.navigation.state.params;
//     console.log(this.state);
//     return (
//       <ScreenWrapper>
//         <Header />
//         <CameraAndImageWrapper screenWidth={width}>
//           {pendingSnapShot ? (
//             <Camera
//               ref={this.camera}
//               screenWidth={width}
//               type={RNCamera.Constants.Type.back}
//               flashMode={RNCamera.Constants.FlashMode.off}
//               androidCameraPermissionOptions={{
//                 title: 'Permission to use camera',
//                 message: 'We need your permission to use your camera',
//                 buttonPositive: 'Ok',
//                 buttonNegative: 'Cancel',
//               }}
//               onGoogleVisionBarcodesDetected={({ barcodes }) => {
//                 console.log(barcodes);
//               }}
//               captureAudio={false}>
//               {({ camera, status }) => {
//                 if (status !== 'READY') {
//                   return (
//                     <PendingView>
//                       <ActivityIndicator
//                         size="large"
//                         color="#8E293E"
//                         animating={true}
//                       />
//                     </PendingView>
//                   );
//                 } else {
//                   return pendingDraggedReady ? null : (
//                     <Shutter onPress={() => this.takeSnapShot(camera)} />
//                   );
//                 }
//               }}
//             </Camera>
//           ) : (
//             <ViewShot ref={this.viewShot}>
//               <Image source={{ uri: `${snapShot}`, width: 300, height: 300 }} />
//             </ViewShot>
//           )}
//         </CameraAndImageWrapper>
//         <Draggable
//           ref={this.logo}
//           x={x}
//           y={y}
//           pressDragRelease={(e, gestureState) => this.setXY(e, gestureState)}
//           renderShape="image"
//           imageSource={businesses[id].logo}
//           renderSize={width / 3}
//         />
//         <ActionBar screenWidth={width}>
//           {pendingDraggedReady ? (
//             <P>Tap and drag to place logo!</P>
//           ) : pendingSnapShot && !snapShot ? (
//             <CameraRollSelector onPress={() => this.selectFromCameraRoll()} />
//           ) : pendingSnapShot && snapShot ? (
//             <Fragment>
//               <CameraRollSelector onPress={() => this.selectFromCameraRoll()} />
//               <Button
//                 onPress={() => this.backToPreviousSnapShot()}
//                 title="Forward again"
//               />
//             </Fragment>
//           ) : (
//             <Fragment>
//               <TopActionBar>
//                 <P>{caption}</P>
//               </TopActionBar>
//               <Button onPress={() => this.retake()} title="Back to camera!" />
//               <Button
//                 onPress={() => this.popModal()}
//                 title="Share to Instagram!"
//               />
//             </Fragment>
//           )}
//         </ActionBar>
//         <Modal
//           animationType="slide"
//           transparent={false}
//           visible={modalVisible}
//           onRequestClose={() => this.handleModalRequestClose()}>
//           <P>
//             Please allow to save the Logoed photo to the Camera Roll (PLEASE
//             INCLUDE CHECK FOR THIS STEP AND CONDITIONAL LOGIC)
//           </P>
//           <P>
//             Please share that photo to Instagram with the caption that's copied
//             to the clipboard to enter the raffle!
//           </P>
//           <Button onPress={() => this.share()} title="Share!" />
//         </Modal>
//       </ScreenWrapper>
//     );
//   }
// }
