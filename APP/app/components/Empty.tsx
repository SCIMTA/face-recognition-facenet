import React, { Component } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import FastImage, { Source } from "react-native-fast-image";
import R from "@app/assets/R";
import { colors } from "@app/constants/Theme";
import WText from "./WText";

const { width, height } = Dimensions.get("window");

interface EmptyProps {
  header?: JSX.Element;
  sourceImage?: Source | number;
  description?: string;
  marginTop?: number;
}

export default class Empty extends Component<EmptyProps> {
  state = {
    marginTop: height / 10
  };

  render() {
    const { header, sourceImage, description, marginTop } = this.props;
    return (
      <View
        onLayout={event => {
          const result = header
            ? event.nativeEvent.layout.height / 2
            : event.nativeEvent.layout.height;
          this.setState({ marginTop: result });
        }}
        style={{
          marginTop: marginTop ? marginTop : this.state.marginTop,
          alignItems: "center",
          flex: 1,
          justifyContent: "center"
        }}
      >
        <FastImage
          source={sourceImage || R.images.empty_procressing_order}
          style={styles.imageEmpty}
          resizeMode="contain"
        />
        <WText font="bold18" style={styles.textEmpty}>
          {description || "Bạn chưa có đơn hàng nào"}
        </WText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageEmpty: {
    width: width / 3,
    height: width / 3
  },
  textEmpty: {
    color: colors.white,
    marginTop: 10
  }
});
