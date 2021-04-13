import React, { useState } from "react";
import { connect } from "react-redux";
import ScreenComponent from "@app/components/ScreenComponent";
import { StyleSheet } from "react-native";
import { callAPIHook } from "@app/utils/CallApiHelper";
import { useEffect } from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import WText from "@app/components/WText";
import { colors } from "@app/constants/Theme";
import NavigationUtil from "@app/navigation/NavigationUtil";
import { SCREEN_ROUTER_APP } from "@app/constants/Constant";

const MainScreen = props => {
  useEffect(() => {}, []);

  const button = [
    {
      title: "Thêm",
      onPress: () => NavigationUtil.navigate(SCREEN_ROUTER_APP.ADD)
    },
    {
      title: "Bắt đầu",
      onPress: () => NavigationUtil.navigate(SCREEN_ROUTER_APP.ACTION)
    },
    {
      title: "Xuất excel",
      onPress: () => {}
    }
  ];
  return (
    <ScreenComponent
      titleHeader="ATT"
      renderView={
        <>
          {button.map(value => (
            <TouchableOpacity
              key={value.title}
              onPress={value.onPress}
              style={{
                alignSelf: "center",
                flex: 1,
                justifyContent: "center",
                backgroundColor: colors.primary,
                width: "80%",
                marginVertical: 20,
                borderRadius: 10
              }}
              children={
                <>
                  <WText
                    children={value.title}
                    style={{ textAlign: "center" }}
                  />
                </>
              }
            />
          ))}
        </>
      }
    />
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen);
const styles = StyleSheet.create({});
