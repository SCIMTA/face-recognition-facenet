import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image
} from "react-native";
import FastImage, { FastImageProps } from "react-native-fast-image";
import { colors } from "@app/constants/Theme";
import R from "@app/assets/R";

const FastImg = (props: FastImageProps) => {
  const [imageLoad, useImageLoad] = useState(false);
  const [error, useEror] = useState(false);
  const [reloadKey, useReloadKey] = useState(new Date().getTime().toString());
  const reloadImage = () => {
    useReloadKey(new Date().getTime().toString());
  };
  var { source } = props;

  if (typeof source == "object")
    source = source.uri
      ? {
          ...source,
          priority: FastImage.priority.high,
          uri: source.uri
        }
      : R.images.ic_symbol;
  return (
    <FastImage
      resizeMode="contain"
      children={
        imageLoad ? (
          <View
            style={{
              backgroundColor: colors.grayBorder,
              flex: 1,
              overflow: "hidden"
            }}
            children={
              <ActivityIndicator
                color={colors.primary}
                style={{
                  flex: 1
                }}
              />
            }
          />
        ) : error ? (
          <TouchableOpacity
            disabled
            style={{
              flex: 1,
              justifyContent: "center"
            }}
            children={
              <Image
                style={{
                  alignSelf: "center"
                }}
                source={R.images.ic_order}
                resizeMode="center"
              />
            }
            onPress={reloadImage}
          />
        ) : (
          props.children
        )
      }
      onLoadStart={() => {
        useEror(false);
        useImageLoad(true);
      }}
      onLoadEnd={() => {
        useImageLoad(false);
      }}
      onError={() => {
        useEror(true);
        useImageLoad(false);
      }}
      {...props}
    />
  );
};

type AvatarProps = FastImageProps & { onPress?; radius? };

export const Avatar = (props: AvatarProps) => {
  const { radius, onPress } = props;
  return (
    <TouchableOpacity
      disabled={!onPress}
      style={{ overflow: "hidden" }}
      onPress={onPress}
      children={
        <FastImg
          style={[
            {
              width: radius || 50,
              height: radius || 50,
              borderRadius: radius / 2 || 25
            },
            props.style
          ]}
          resizeMode="contain"
          {...props}
        />
      }
    />
  );
};
export default FastImg;
