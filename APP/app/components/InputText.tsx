import React, { useState } from "react";
import { StyleSheet, View, TextInputProps } from "react-native";
import R from "@app/assets/R";
import { colors, fonts } from "@app/constants/Theme";
import { TextInput } from "react-native";
import FastImg from "./FastImage";
import { FlatList } from "react-native";
import WText from "./WText";
import { callAPIHook } from "@app/utils/CallApiHelper";
import { TouchableOpacity } from "react-native";

interface ClientInfo {
  CLIENT_NAME;
  CLIENT_PHONE;
}

interface CustomProps {
  icon: number;
}
type Props = CustomProps & TextInputProps;
export default (props: Props) => {
  const { icon } = props;
  return (
    <>
      <View
        style={{ flexDirection: "row" }}
        children={
          <>
            <FastImg
              style={{
                width: 25,
                aspectRatio: 1,
                alignSelf: "center",
                marginStart: 10
                // marginTop: note ? 18 : 0
              }}
              source={icon}
              tintColor={colors.primaryDark}
            />
            <TextInput
              {...props}
              style={[
                {
                  margin: 10,
                  borderRadius: 10,
                  borderBottomWidth: 1,
                  padding: 10,
                  width: "85%",
                  fontFamily: R.fonts.medium,
                  fontSize: 16,
                  marginBottom: props.multiline ? 100 : 10,
                  marginStart: 5
                },
                props.style
              ]}
            />
          </>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({});
