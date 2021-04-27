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
import { upload_person } from "@api";
import { FlatList } from "react-native";
import reactotron from "@app/reactotron/ReactotronConfig";
import NavigationUtil from "@app/navigation/NavigationUtil";
import { SCREEN_ROUTER_APP } from "@app/constants/Constant";
import { showMessages } from "@app/utils/AlertHelper";

const AddScreen = props => {
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [isLoading, setLoading] = useState(false);

  const callApiAddPerson = () => {
    callAPIHook({
      API: upload_person,
      useLoading: setLoading,
      formdata: {
        name,
        files: images
          .filter(e => !!e)
          .map((e, i) => ({
            uri: e,
            name: e.split("/").pop(),
            type: "image/jpeg",
            filename: new Date().getTime() + `_${i}.jpeg`
          })),
        train_option: 1
      },
      onSuccess: res => {
        showMessages("", "Đã thêm " + name);
        NavigationUtil.navigate(SCREEN_ROUTER_APP.MAIN);
      },
      onError: err => {
        console.log(err);
      }
    });
  };

  useEffect(() => {}, []);
  return (
    <ScreenComponent
      dialogLoading={isLoading}
      back
      titleHeader="Thêm"
      renderView={
        <>
          <InputText
            value={name}
            onChangeText={setName}
            icon={R.images.ic_user}
            placeholder="Tên nhân viên"
          />

          <View
            style={{ marginVertical: 30 }}
            children={[0, 3].map((e, i) => (
              <View
                key={i}
                style={{ flexDirection: "row" }}
                children={[0, 1, 2].map((r, j) => (
                  <TouchableOpacity
                    key={j}
                    onPress={() => {
                      imagePickerHelper(setImages, 6);
                    }}
                    style={{
                      margin: 5,
                      borderRadius: 10,
                      borderWidth: 0.5,
                      flex: 1,
                      borderColor: colors.primary
                    }}
                    children={
                      <FastImg
                        resizeMode={!images[e + r] ? "center" : "cover"}
                        style={{
                          aspectRatio: 1,
                          borderRadius: 10
                        }}
                        tintColor={!images[e + r] ? colors.primary : null}
                        source={
                          !images[e + r]
                            ? R.images.ic_face
                            : { uri: images[e + r] }
                        }
                      />
                    }
                  />
                ))}
              />
            ))}
          />

          <TouchableOpacity
            onPress={callApiAddPerson}
            style={{
              backgroundColor: colors.primary,
              padding: 15,
              alignSelf: "center",
              borderRadius: 5
            }}
            children={
              <WText
                style={{
                  paddingHorizontal: 30
                }}
                color={colors.white}
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
