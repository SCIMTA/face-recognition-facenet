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
import InputText from "@app/components/InputText";
import R from "@app/assets/R";
import imagePickerHelper from "@app/utils/ImagePickerHelper";
import FastImg from "@app/components/FastImage";

const AddScreen = props => {
  const [image, setImage] = useState(null);

  useEffect(() => {}, []);

  return (
    <ScreenComponent
      back
      titleHeader="Thêm"
      renderView={
        <>
          <TouchableOpacity
            onPress={() => {
              imagePickerHelper(setImage);
            }}
            style={{
              height: "30%",
              backgroundColor: colors.primary,
              margin: 15,
              borderRadius: 10,
              justifyContent: "center"
            }}
            children={
              !!image ? (
                <FastImg
                  style={{ width: "100%", height: "100%" }}
                  source={{ uri: image }}
                />
              ) : (
                <WText
                  style={{ textAlign: "center" }}
                  children="Ảnh nhân viên"
                />
              )
            }
          />
          <InputText icon={R.images.ic_user} placeholder="Tên nhân viên" />
          <TouchableOpacity
            style={{
              alignSelf: "center",
              backgroundColor: colors.primary,
              padding: 10,
              borderRadius: 5,
              margin: 15
            }}
            children={<WText children="Xác nhận" />}
          />
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
)(AddScreen);
const styles = StyleSheet.create({});
