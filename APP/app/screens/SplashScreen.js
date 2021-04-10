import React, { Component } from "react";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import NavigationUtil from "../navigation/NavigationUtil";
import { ROLE, SCREEN_ROUTER } from "@constant";
import AsyncStorage from "@react-native-community/async-storage";

export default class SplashScreen extends Component {
  async componentDidMount() {
    const token = await AsyncStorage.getItem("token");
    const role = await AsyncStorage.getItem("role");
    if (token) {
      if (role == ROLE.ADMIN) NavigationUtil.navigate(SCREEN_ROUTER.APP);
      else NavigationUtil.navigate(SCREEN_ROUTER.SHOP);
    } else NavigationUtil.navigate(SCREEN_ROUTER.AUTH);
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
