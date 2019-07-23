import React, { Component } from "react";
import {
  Text,
  View,
  Platform,
  Linking,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { Button } from "../components";

export class Loading extends Component {
  static navigationOptions = {
    title: "Loading Screen"
  };
  state = {
    loading: false
  };
  componentDidMount() {
    if (Platform.OS === "android") {
      Linking.getInitialURL().then(url => {
        this.navigate(url);
      });
    } else {
      Linking.addEventListener("url", this.handleOpenURL);
    }
    // TODO How do we navigate to a useful screen if it isn't opened by url?
  }
  componentWillUnmount() {
    Linking.removeEventListener("url", this.handleOpenURL);
  }
  handleOpenURL = event => {
    this.setState({ loading: true });
    setTimeout(() => this.navigate(event.url), 200);
  };
  checkMockServer = business => {
    const businesses = ["Burgerology", "Jonathans", "Leilu"];
    if (businesses.includes(business)) {
      return business;
    } else {
      return "Error! Can't find business in Logoed database!";
    }
  };
  // ! Please give the local navigate(url) it's own name.
  navigate = url => {
    this.setState({ loading: false });
    const { navigate } = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, "");
    const id = route.match(/\/([^\/]+)\/?$/)[1];
    const routeName = route.split("/")[0];
    if (routeName === "App") {
      let checkReturn = this.checkMockServer(id);
      if (checkReturn === id) {
        navigate("Welcome", { id });
      } else {
        this.setState({
          errorMessage: "Error! Can't find business in Logoed database!"
        });
      }
    }
  };
  quickButtonGo = () => {
    const url = "logoedapp://App/Leilu";
    Linking.openURL(url).catch(err => console.error("An error occurred", err));
  };
  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? null : <Text>Welcome to Logoed!</Text>}
        <ActivityIndicator
          size='large'
          color='#8E293E'
          animating={this.state.loading}
        />
        <Button onPress={this.quickButtonGo} title='Go!' />
        {this.state.errorMessage ? (
          <Text>{this.state.errorMessage}</Text>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Loading;
