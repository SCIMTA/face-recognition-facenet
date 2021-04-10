import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacityProps,
  Linking
} from "react-native";
import R from "@app/assets/R";
import WText from "./WText";
import { formatNumber, toDateString } from "@app/utils/Utils";
import { TouchableOpacity } from "react-native";
import FastImg from "./FastImage";
import NavigationUtil from "@app/navigation/NavigationUtil";
import {
  SCREEN_ROUTER_ADMIN,
  SCREEN_ROUTER_SHOP
} from "@app/constants/Constant";
import { callAPIHook } from "@app/utils/CallApiHelper";
import { confirm_order, delete_order } from "@app/constants/Api";
import reactotron from "@app/reactotron/ReactotronConfig";
import { showConfirm } from "@app/utils/AlertHelper";
import { colors } from "@app/constants/Theme";

interface CustomProps {
  ORDER_NAME;
  ORDER_ADDRESS;
  ORDER_PHONE;
  ORDER_PRICE;
  ORDER_STATUS;
  NOTES;
  CREATE_DATE;
  admin;
  navigation;
  setClose;
  ID_ORDER;
  IMAGE_URL;
  setOpen;
  CLIENT_NAME;
  WEEK_ACTIVE;
}
type Props = CustomProps;

const RowDetail = ({ title, content, line = false, membership = 0 }) => {
  return (
    <>
      <View
        style={styles.root_row}
        children={
          <>
            <WText font="regular16" children={title} />
            <View
              style={{ maxWidth: "60%" }}
              children={
                <>
                  <WText
                    style={{ textAlign: "right" }}
                    font="regular16"
                    children={content}
                  />
                  {membership == 1 && (
                    <WText
                      font="italic14"
                      children="Khách hàng thân thiết"
                      color={colors.red}
                    />
                  )}
                </>
              }
            />
          </>
        }
      />

      {line && (
        <View
          style={{
            height: 1.5,
            backgroundColor: "gray",
            width: "100%"
          }}
        />
      )}
    </>
  );
};

export default (props: Props) => {
  const {
    ORDER_NAME,
    ORDER_ADDRESS,
    ORDER_PHONE,
    ORDER_PRICE,
    ORDER_STATUS,
    NOTES,
    CREATE_DATE,
    ID_ORDER,
    admin = false,
    navigation,
    setClose,
    IMAGE_URL,
    CLIENT_NAME,
    WEEK_ACTIVE
  } = props;
  const onPressDeleteOrder = () => {
    showConfirm("Xoá đơn hàng", "", () =>
      callAPIHook({
        API: delete_order,
        formdata: { id_order: ID_ORDER },
        onSuccess: res => {
          setClose();
          NavigationUtil.navigate(navigation, { reload: true });
        }
      })
    );
  };
  const onPressEditOrder = () => {
    setClose();
    NavigationUtil.navigate(SCREEN_ROUTER_ADMIN.EDIT_ORDER, props);
  };
  const onPressPhoneCallOrder = () => {
    Linking.openURL("tel:" + ORDER_PHONE);
  };
  const onPressConfirmOrder = () => {
    showConfirm(
      ORDER_STATUS == 0 ? "Đã giao đơn hàng" : "Bỏ đã giao đơn hàng",
      "",
      () =>
        callAPIHook({
          API: confirm_order,
          payload: {
            id_order: ID_ORDER,
            status: ORDER_STATUS == 0 ? 1 : 0
          },
          onSuccess: res => {
            setClose();
            NavigationUtil.navigate(navigation, { reload: true });
          }
        })
    );
  };
  return (
    <>
      <WText
        style={{
          textAlign: "center",
          padding: 15,
          fontFamily: R.fonts.medium,
          fontSize: 18
        }}
        children="Chi tiết đơn hàng"
      />
      <View
        style={{
          height: 1,
          width: "95%",
          backgroundColor: "gray",
          alignSelf: "center"
        }}
      />
      <TouchableOpacity
        onPress={() => {
          if (IMAGE_URL) {
            const naviImg = navigation.includes("Admin")
              ? SCREEN_ROUTER_ADMIN.IMAGE_VIEW
              : SCREEN_ROUTER_SHOP.IMAGE_VIEW;
            NavigationUtil.navigate(naviImg, {
              props
            });
          }
        }}
        children={
          <FastImg
            resizeMode="cover"
            style={{
              width: "50%",
              aspectRatio: 1,
              alignSelf: "center",
              margin: 10
            }}
            source={{ uri: IMAGE_URL }}
          />
        }
      />
      <View
        style={{
          padding: 10,
          paddingTop: 0
        }}
        children={
          <>
            <RowDetail content={ID_ORDER} title={"Mã đơn"} />
            <RowDetail content={ORDER_NAME} title={"Tên đơn"} />
            <RowDetail content={ORDER_ADDRESS} title={"Địa chỉ"} />
            <RowDetail
              content={formatNumber(ORDER_PRICE || 0) + "đ"}
              title={"Giá"}
            />
            <RowDetail content={ORDER_PHONE} title={"Điện thoại"} />
            <RowDetail
              membership={WEEK_ACTIVE}
              content={CLIENT_NAME}
              title={"Người nhận"}
            />
            <RowDetail
              content={ORDER_STATUS == 1 ? "Đã giao" : "Chưa giao"}
              title={"Trạng thái"}
            />
            <RowDetail content={NOTES} title={"Ghi chú"} />
            <RowDetail
              line={false}
              content={
                new Date(CREATE_DATE).toLocaleTimeString() +
                " " +
                toDateString(new Date(CREATE_DATE))
              }
              title={"Ngày tạo"}
            />
          </>
        }
      />
      <View
        style={{ flexDirection: "row" }}
        children={
          <>
            {admin && (
              <TouchableOpacity
                onPress={onPressDeleteOrder}
                style={{ backgroundColor: "lightcoral", flex: 1 }}
                children={
                  <FastImg
                    style={styles.ic_phone}
                    source={R.images.ic_delete}
                    tintColor="red"
                  />
                }
              />
            )}
            {admin && (
              <TouchableOpacity
                onPress={onPressEditOrder}
                style={{ backgroundColor: "wheat", flex: 1 }}
                children={
                  <FastImg
                    style={styles.ic_phone}
                    source={R.images.ic_edit}
                    tintColor="peru"
                  />
                }
              />
            )}

            <TouchableOpacity
              onPress={onPressPhoneCallOrder}
              style={{ backgroundColor: "palegreen", flex: 1 }}
              children={
                <FastImg
                  style={styles.ic_phone}
                  source={R.images.ic_phone}
                  tintColor="green"
                />
              }
            />
            {admin && (
              <TouchableOpacity
                onPress={onPressConfirmOrder}
                style={{ backgroundColor: colors.primaryDark, flex: 1 }}
                children={
                  <FastImg
                    style={styles.ic_phone}
                    source={R.images.ic_shipped}
                    tintColor={colors.white}
                  />
                }
              />
            )}
          </>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  root_row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    marginVertical: 5,
    paddingHorizontal: 5
  },
  ic_phone: {
    width: 40,
    height: 40,
    alignSelf: "center",
    marginVertical: 10
  }
});
