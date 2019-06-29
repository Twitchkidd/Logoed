import React, { Component } from "react";
import { Text, View, Button, Platform, Linking } from "react-native";

export class Loading extends Component {
  static navigationOptions = {
    title: "Loading Screen"
  };
  componentDidMount() {
    if (Platform.OS === "android") {
      Linking.getInitialUrl().then(url => {
        this.navigate(url);
      });
    } else {
      Linking.addEventListener("url", this.handleOpenURL);
    }
  }
  componentWillUnmount() {
    Linking.removeEventListener("url", this.handleOpenURL);
  }
  handleOpenURL = event => {
    this.navigate(event.url);
  };
  navigate = url => {
    const { navigate } = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, "");
    const id = route.match(/\/([^\/]+)\/?$/)[1];
    const routeName = route.split("/")[0];
    if (routeName === "Welcome") {
      navigate("Welcome", { id, name: "Chris" });
    }
  };
  render() {
    return (
      <View>
        <Text> Loading! </Text>
        <Button
          title='To Welcome!'
          onPress={() => this.props.navigation.navigate("Welcome")}
        />
      </View>
    );
  }
}

export default Loading;
