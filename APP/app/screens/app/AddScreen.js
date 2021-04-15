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
import { ScrollView } from "react-native";
import { FlatList } from "react-native";

const AddScreen = props => {
  const [images, setImages] = useState([]);

  useEffect(() => {}, []);

  return (
    <ScreenComponent
      back
      titleHeader="Thêm"
      renderView={
        <>
          <InputText icon={R.images.ic_user} placeholder="Tên nhân viên" />

          <View
            style={{ flexDirection: "row", marginVertical: 30 }}
            children={
              <>
                <TouchableOpacity
                  onPress={() => {
                    imagePickerHelper(res => {
                      setImages(images.concat(res));
                    });
                  }}
                  style={{
                    height: width / 3.5,
                    aspectRatio: 1,
                    backgroundColor: colors.primary,
                    margin: 5,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignSelf: "center"
                  }}
                  children={
                    <WText
                      style={{ textAlign: "center" }}
                      children="Thêm ảnh"
                    />
                  }
                />
                <FlatList
                  data={images.reverse()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => `${index}`}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() => {}}
                      style={{
                        height: width / 3,
                        margin: 5,
                        borderRadius: 10
                      }}
                      children={
                        <FastImg
                          resizeMode="cover"
                          style={{
                            width: width / 3,
                            aspectRatio: 1,
                            borderRadius: 10
                          }}
                          source={{ uri: item }}
                        />
                      }
                    />
                  )}
                />
              </>
            }
          />
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              padding: 15,
              alignSelf: "center",
              borderRadius: 5
            }}
            children={
              <WText
                style={{
                  paddingHorizontal: 15
                }}
                children="Xác nhận"
              />
            }
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
