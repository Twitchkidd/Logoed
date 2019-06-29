import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";

// Obv. we're going to want businesses, not people, and it's going to come from the network, not hardcoded
const people = {
  0: {
    name: "Leela",
    image:
      "http://vignette1.wikia.nocookie.net/en.futurama/images/d/d4/Turanga_Leela.png/revision/latest?cb=20150218013044"
  },
  1: {
    name: "Bender",
    image:
      "https://vignette2.wikia.nocookie.net/en.futurama/images/4/43/Bender.png/revision/latest?cb=20150206072725"
  },
  2: {
    name: "Amy",
    image: "https://i.ytimg.com/vi/4sCtTq7K3yI/hqdefault.jpg"
  },
  3: {
    name: "Fry",
    image:
      "http://www.supergrove.com/wp-content/uploads/2017/03/fry-futurama-22-which-robot-from-quotfuturamaquot-are-you.jpg"
  }
};

export default class Welcome extends Component {
  static navigationOptions = {
    title: "Welcome Screen"
  };
  render() {
    const { id } = this.props.navigation.state.params;
    if (!people[id]) return <Text>Sorry, no data exists for this user</Text>;
    return (
      <View>
        <Text style={styles.text}>{people[id].name}</Text>
        <Image
          resizeMode='contain'
          style={styles.image}
          source={{ uri: people[id].image }}
        />
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
