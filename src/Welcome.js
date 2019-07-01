import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const businesses = {
  Burgerology: {
    name: "Burgerology",
    logo: require("./assets/burgerology-logo.jpg"),
    handle: "@burgerologyny"
  },
  Jonathans: {
    name: "Jonathans",
    logo: require("./assets/jonathans-logo.png"),
    handle: "@jonathansrestaurantli"
  },
  Leilu: {
    name: "Leilu",
    logo: require("./assets/leilu-logo.png"),
    handle: "@leiluhuntington"
  }
};

export default class Welcome extends Component {
  static navigationOptions = {
    title: "Welcome Screen"
  };
  render() {
    const { id } = this.props.navigation.state.params;
    return (
      <View>
        <Text style={styles.text}>{businesses[id].name}</Text>
        <Image
          resizeMode='contain'
          style={styles.image}
          source={businesses[id].logo}
        />
        <Text>Find us on Instagram! {businesses[id].handle}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    margin: 19,
    fontSize: 22
  },
  image: {
    width: 400,
    height: 400
  }
});
