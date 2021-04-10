import React from "react";
import { connect } from "react-redux";
import ScreenComponent from "@app/components/ScreenComponent";
import { TouchableOpacity } from "react-native";
import R from "@R";
import { TextInput } from "react-native";
import { ScrollView } from "react-native";
import { useState } from "react";
import NavigationUtil from "@app/navigation/NavigationUtil";
import { SCREEN_ROUTER_SHOP } from "@app/constants/Constant";
import WText from "@app/components/WText";
import { colors } from "@app/constants/Theme";
import { View } from "react-native";
import FastImg from "@app/components/FastImage";
import { callAPIHook } from "@app/utils/CallApiHelper";
import { change_password } from "@app/constants/Api";
import { showMessages } from "@app/utils/AlertHelper";

const InputText = props => {
  return (
    <View
      style={{ flexDirection: "row" }}
      children={
        <>
          <FastImg
            style={{
              width: 25,
              aspectRatio: 1,
              alignSelf: props.note ? "auto" : "center",
              marginStart: 10,
              marginTop: props.note ? 18 : 0
            }}
            source={props.icon}
            tintColor={colors.primaryDark}
          />
          <TextInput
            {...props}
            secureTextEntry
            style={{
              margin: 10,
              padding: 10,
              borderRadius: 10,
              borderBottomWidth: 1,
              width: "85%",
              fontFamily: R.fonts.medium,
              fontSize: 16,
              ...props.style
            }}
          />
        </>
      }
    />
  );
};

const ChangePasswordScreen = props => {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [validPass, setValidPass] = useState("");
  const [loading, setLoading] = useState(false);
  const onPressChangePassword = () => {
    if (newPass != validPass) {
      showMessages("Mật khẩu không trùng khớp");
      return;
    }

    callAPIHook({
      API: change_password,
      payload: {
        old_password: currentPass,
        new_password: newPass
      },
      useLoading: setLoading,
      onSuccess: res => {
        NavigationUtil.goBack();
      }
    });
  };

  return (
    <ScreenComponent
      dialogLoading={loading}
      titleHeader={"Đổi mật khẩu"}
      back
      renderView={
        <>
          <ScrollView
            style={{
              backgroundColor: "white"
            }}
          >
            <InputText
              maxLength={128}
              icon={R.images.ic_user}
              onChangeText={setCurrentPass}
              value={currentPass}
              placeholder="Mật khẩu hiện tại"
            />
            <InputText
              maxLength={128}
              icon={R.images.ic_lock}
              onChangeText={setNewPass}
              value={newPass}
              placeholder="Mật khẩu mới"
            />
            <InputText
              maxLength={128}
              icon={R.images.ic_submit}
              onChangeText={setValidPass}
              value={validPass}
              placeholder="Xác minh mật khẩu"
            />
          </ScrollView>
          <TouchableOpacity
            onPress={onPressChangePassword}
            style={{
              bottom: 0,
              position: "absolute",
              backgroundColor: "lightgreen",
              width,
              padding: 10
            }}
            children={
              <WText
                font="bold18"
                color="green"
                style={{ textAlign: "center" }}
                children={"Đổi mật khẩu"}
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
)(ChangePasswordScreen);
