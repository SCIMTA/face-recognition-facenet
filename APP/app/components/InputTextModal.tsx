import React from "react";
import { StyleSheet, View, TextInputProps } from "react-native";
import R from "@app/assets/R";
import { TextInput } from "react-native";
import FastImg from "./FastImage";

interface CustomProps {
  icon;
}
type Props = CustomProps & TextInputProps;
export default (props: Props) => {
  const { icon } = props;
  return (
    <View
      style={{ flexDirection: "row" }}
      children={
        <>
          <FastImg source={icon} style={styles.modal_icon_input} />
          <TextInput {...props} style={styles.input_edit} />
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  modal_icon_input: {
    width: 25,
    aspectRatio: 1,
    alignSelf: "center",
    marginStart: 15
  },
  input_edit: {
    margin: 15,
    borderBottomWidth: 0.8,
    padding: 0,
    width: "80%",
    fontFamily: R.fonts.regular,
    fontSize: 16
  }
});
