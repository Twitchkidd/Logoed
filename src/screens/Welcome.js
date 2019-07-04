import React, { Component } from "react";
import { Text, View, Image, StyleSheet, Button } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { lightOrange, darkOrange, blue } from "../utilities";

const businesses = {
  Burgerology: {
    name: "Burgerology",
    logo: require("../assets/burgerology-logo.jpg"),
    handle: "@burgerologyny"
  },
  Jonathans: {
    name: "Jonathans",
    logo: require("../assets/jonathans-logo.png"),
    handle: "@jonathansrestaurantli"
  },
  Leilu: {
    name: "Leilu",
    logo: require("../assets/leilu-logo.png"),
    handle: "@leiluhuntington"
  }
};

export default class Welcome extends Component {
  static navigationOptions = {
    title: "Welcome Screen"
  };
  onPressButton = () => {
    console.log("Boop!");
    const { id } = this.props.navigation.state.params;
    this.props.navigation.navigate("Logoing", { id });
  };
  render() {
    const { id } = this.props.navigation.state.params;
    return (
      <LinearGradient
        colors={[lightOrange, darkOrange]}
        style={styles.container}>
        <Image
          style={styles.logoedLogo}
          source={require("../assets/logo-1x.png")}
        />
        <Text style={styles.text}>In partnership with:</Text>
        <Image
          resizeMode='contain'
          style={styles.image}
          source={businesses[id].logo}
        />
        <Text style={styles.text}>
          Snap a photo for your Instragram and put the {businesses[id].name}{" "}
          logo with on it to enter to win a $50 gift card!
        </Text>
        <Button
          onPress={this.onPressButton}
          title='Snap photo!'
          color={blue}
          accessibilityLabel='This initiates a request for camera permissions and advances to the next screen.'
        />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  text: {
    fontSize: 22
  },
  image: {
    width: 200,
    height: 200
  },
  logoedLogo: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  }
});
