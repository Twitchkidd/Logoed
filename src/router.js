import { createStackNavigator, createAppContainer } from "react-navigation";
import Loading from "./screens/Loading";
import Welcome from "./screens/Welcome";
import Logoing from "./screens/Logoing";

const Router = createStackNavigator(
  {
    Loading: Loading,
    Welcome: Welcome,
    Logoing: Logoing
  },
  {
    initialRouteName: "Loading"
  }
);

export default createAppContainer(Router);
