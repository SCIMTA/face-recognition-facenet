import React, { Component } from "react";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import NavigationUtil from "../navigation/NavigationUtil";
import { ROLE, SCREEN_ROUTER } from "@constant";

export default class SplashScreen extends Component {
  componentDidMount() {
    NavigationUtil.navigate(SCREEN_ROUTER.APP);
  }

  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <View>
          <ActivityIndicator />
          <Text>Splash</Text>
        </View>
      </SafeAreaView>
    );
  }
}
