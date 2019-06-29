import { createStackNavigator, createAppContainer } from "react-navigation";
import Loading from "./Loading";
import Welcome from "./Welcome";

const Router = createStackNavigator(
  {
    Loading: Loading,
    Welcome: Welcome
  },
  {
    initialRouteName: "Loading"
  }
);

export default createAppContainer(Router);
