import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SplashScreen from "@app/screens/SplashScreen";
import LoginScreen from "@app/screens/auth/LoginScreen";
import {
  SPLASH,
  SCREEN_ROUTER,
  SCREEN_ROUTER_AUTH,
  SCREEN_ROUTER_APP
} from "@constant";
import MainScreen from "@app/screens/app/MainScreen";
import AddScreen from "@app/screens/app/AddScreen";

const Auth = createStackNavigator(
  {
    [SCREEN_ROUTER_AUTH.LOGIN]: LoginScreen
  },
  { headerMode: "none" }
);

const AppStack = createStackNavigator(
  {
    [SCREEN_ROUTER_APP.MAIN]: MainScreen,
    [SCREEN_ROUTER_APP.ADD]: AddScreen
  },
  { headerMode: "none", initialRouteName: SCREEN_ROUTER_APP.MAIN }
);
export default createAppContainer(
  createSwitchNavigator(
    {
      [SPLASH]: SplashScreen,
      // [SCREEN_ROUTER.AUTH]: Auth,
      [SCREEN_ROUTER.APP]: AppStack
    },
    {
      initialRouteName: SCREEN_ROUTER.APP
    }
  )
);
