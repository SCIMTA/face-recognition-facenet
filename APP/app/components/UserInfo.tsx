import React from "react";
import { StyleSheet, Text, View, TextProps } from "react-native";
import R from "@app/assets/R";
import { colors, fonts } from "@app/constants/Theme";
import WText from "./WText";
import FastImg from "./FastImage";

interface CustomProps {
  SHOP_NAME;
  SHOP_ADDRESS;
  SHOP_PHONE;
  border;
}
type Props = CustomProps & TextProps;

const Item = ({ icon, title, line = true }) => {
  return (
    <>
      <View
        style={{ flexDirection: "row", marginVertical: 15 }}
        children={
          <>
            <FastImg
              source={icon}
              style={{ height: 25, width: 25, marginEnd: 10 }}
            />
            <WText font="regular18" children={title} />
          </>
        }
      />
      {line && (
        <View style={{ height: 1.5, width: "100%", backgroundColor: "gray" }} />
      )}
    </>
  );
};

export default (props: Props) => {
  const { SHOP_NAME, SHOP_ADDRESS, SHOP_PHONE, border = true } = props;
  return (
    <View
      style={{
        backgroundColor: colors.white,
        padding: 10,
        paddingVertical: 5
      }}
      children={
        <>
          <Item icon={R.images.ic_user} title={SHOP_NAME} />
          <Item icon={R.images.ic_address} title={SHOP_ADDRESS} />
          <Item
            icon={R.images.ic_phone_clear}
            title={SHOP_PHONE}
            line={false}
          />
        </>
      }
    />
  );
};

const styles = StyleSheet.create({});
