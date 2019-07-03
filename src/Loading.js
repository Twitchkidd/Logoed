import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  Platform,
  Linking,
  ActivityIndicator
} from "react-native";

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
  }
  componentWillUnmount() {
    Linking.removeEventListener("url", this.handleOpenURL);
  }
  handleOpenURL = event => {
    this.setState({ loading: true });
    setTimeout(() => this.navigate(event.url), 3000);
  };
  checkMockServer = business => {
    const businesses = ["Burgerology", "Jonathans", "Leilu"];
    if (businesses.includes(business)) {
      return business;
    } else {
      return "Error! Can't find business in Logoed database!";
    }
  };
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
  render() {
    return (
      <View>
        <Text>Welcome to Logoed!</Text>
        <ActivityIndicator
          size='large'
          color='#8E293E'
          animating={this.state.loading}
        />
        {this.state.errorMessage ? (
          <Text>{this.state.errorMessage}</Text>
        ) : null}
      </View>
    );
  }
}

export default Loading;
