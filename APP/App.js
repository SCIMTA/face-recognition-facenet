/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import codePush from "react-native-code-push";
import { Provider } from "react-redux";
import AppNavigator from "./app/navigation/AppNavigator";
import NavigationUtil from "./app/navigation/NavigationUtil";
import store from "./app/redux/store";
import OneSignalHelper from "@app/utils/OneSignalHelper";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator
          ref={navigatorRef =>
            NavigationUtil.setTopLevelNavigator(navigatorRef)
          }
        />
      </Provider>
    );
  }

  constructor(properties) {
    super(properties);
    OneSignalHelper.initialization("d036aedf-8809-46c0-93c4-57cd80f88056");
  }

  componentWillUnmount() {
    OneSignalHelper.destruction();
  }
}

const MyApp = codePush({
  checkFrequency: codePush.CheckFrequency.MANUAL
  // installMode: codePush.InstallMode
})(App);

export default MyApp;
//appcenter codepush release-react -a hoangnh5901/Logistics -d Production
