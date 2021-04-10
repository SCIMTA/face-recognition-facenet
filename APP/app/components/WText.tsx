import React from "react";
import { StyleSheet, Text, View, TextProps } from "react-native";
import R from "@app/assets/R";
import { fonts } from "@app/constants/Theme";

interface CustomProps {
  font?:
    | "regular12"
    | "regular14"
    | "regular16"
    | "regular18"
    | "regular20"
    | "regular24"
    | "regular30"
    | "bold12"
    | "bold14"
    | "bold16"
    | "bold18"
    | "bold20"
    | "bold24"
    | "bold30"
    | "italic12"
    | "italic14"
    | "italic16"
    | "italic18"
    | "italic20"
    | "italic24"
    | "italic30";
  children?: string;
  color?: string;
}
type Props = CustomProps & TextProps;
export default (props: Props) => {
  const { font = "regular16" } = props;
  return (
    <Text
      {...props}
      style={[{ ...fonts[font], color: props.color }, props.style]}
    />
  );
};

const styles = StyleSheet.create({});
