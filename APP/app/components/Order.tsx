import React from "react";
import { StyleSheet, Dimensions, TouchableOpacityProps } from "react-native";
import R from "@app/assets/R";
import { colors, fonts } from "@app/constants/Theme";
import WText from "./WText";
import { formatNumber, toDateString } from "@app/utils/Utils";
import { TouchableOpacity } from "react-native";
import FastImg from "./FastImage";
const { width } = Dimensions.get("screen");
interface CustomProps {
  ORDER_NAME;
  ORDER_ADDRESS;
  ORDER_PHONE;
  ORDER_PRICE;
  ORDER_STATUS;
  IMAGE_URL;
  CREATE_DATE;
  WEEK_ACTIVE;
}
type Props = CustomProps & TouchableOpacityProps;
export default (props: Props) => {
  const {
    ORDER_NAME,
    ORDER_ADDRESS,
    WEEK_ACTIVE,
    ORDER_PRICE,
    ORDER_STATUS,
    IMAGE_URL,
    CREATE_DATE
  } = props;
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.root,
        {
          backgroundColor: ORDER_STATUS == 1 ? "#baffba" : "white"
        }
      ]}
      children={
        <>
          <FastImg
            style={{ width: width / 2.1, aspectRatio: 1, alignSelf: "center" }}
            resizeMode="cover"
            source={{ uri: IMAGE_URL }}
          />
          <WText
            font="bold20"
            numberOfLines={1}
            ellipsizeMode="tail"
            children={ORDER_NAME}
          />
          <WText
            color={"orangered"}
            children={formatNumber(ORDER_PRICE) + "đ"}
          />
          <WText
            style={{ marginVertical: 5 }}
            color={"dimgray"}
            numberOfLines={1}
            ellipsizeMode="tail"
            children={ORDER_ADDRESS}
          />
          <WText
            font="italic12"
            style={{ textAlign: "right" }}
            children={
              new Date(CREATE_DATE).toLocaleTimeString() +
              " " +
              toDateString(new Date(CREATE_DATE))
            }
          />
          {WEEK_ACTIVE == 1 && (
            <FastImg
              style={{
                width: 40,
                aspectRatio: 1,
                backgroundColor: colors.primary,
                borderRadius: 20,
                position: "absolute",
                right: -5,
                zIndex: 99,
                top: -5
              }}
              tintColor={colors.white}
              source={R.images.ic_membership}
            />
          )}
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    backgroundColor: colors.white,
    width: "47.5%",
    margin: 5
  }
});
