import { ROLE, SCREEN_ROUTER, SPLASH } from "@app/constants/Constant";
import { callAPIHook } from "@app/utils/CallApiHelper";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Keyboard } from "react-native";
import { TextInput, StyleSheet } from "react-native";
import { Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import NavigationUtil from "../../navigation/NavigationUtil";
import { login } from "@api";
import AsyncStorage from "@react-native-community/async-storage";
import ScreenComponent from "@app/components/ScreenComponent";
import R from "@app/assets/R";
import WText from "@app/components/WText";
import reactotron from "@app/reactotron/ReactotronConfig";
import OneSignal from "react-native-onesignal";
import CodePush from "react-native-code-push";
const LoginScreen = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [player_id, setPlayerId] = useState("");
  useEffect(() => {
    OneSignal.getPermissionSubscriptionState(state => {
      if (state?.userId) setPlayerId(state?.userId);
    });
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      children={
        <>
          <View
            style={{
              backgroundColor: "#B57EDC",
              flex: 1,
              flexDirection: "column-reverse"
            }}
            children={
              <>
                <View style={styles.card}>
                  <WText
                    style={{ marginVertical: 40, fontFamily: R.fonts.medium }}
                    font="regular24"
                    children="Đăng nhập"
                  />
                  <WText
                    style={styles.label}
                    font="bold14"
                    color="dimgray"
                    children="Tên đăng nhập"
                  />
                  <TextInput
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                    placeholder="hoangnh"
                  />
                  <WText
                    style={styles.label}
                    font="bold14"
                    color="dimgray"
                    children="Mật khẩu"
                  />
                  <TextInput
                    value={password}
                    secureTextEntry
                    style={styles.input}
                    onChangeText={setPassword}
                    placeholder="*******"
                  />
                  <TouchableOpacity
                    onPress={() => {
                      callAPIHook({
                        API: login,
                        payload: {
                          username,
                          password,
                          player_id
                        },
                        onSuccess: async res => {
                          await AsyncStorage.setItem(
                            "role",
                            res.data.USER_ROLE + ""
                          );
                          const token = await AsyncStorage.setItem(
                            "token",
                            res.data.token
                          );
                          CodePush.restartApp();
                          // if (res.data.USER_ROLE == ROLE.ADMIN) {
                          //   NavigationUtil.navigate(SCREEN_ROUTER.ADMIN);
                          // } else {
                          //   NavigationUtil.navigate(SCREEN_ROUTER.SHOP);
                          // }
                        },
                        onError: err => {
                          console.log(err);
                        }
                      });
                    }}
                    style={{
                      margin: 10,
                      backgroundColor: "white",
                      padding: 10,
                      paddingHorizontal: 15
                    }}
                    children={
                      <WText
                        font="regular14"
                        color="white"
                        style={{
                          textAlign: "center",
                          backgroundColor: "#B57EDC",
                          width: width * 0.8,
                          padding: 12,
                          borderRadius: 15,
                          borderTopRightRadius: 0,
                          borderTopLeftRadius: 15,
                          paddingVertical: 15,
                          overflow: "hidden"
                        }}
                        children={"ĐĂNG NHẬP"}
                      />
                    }
                  />
                </View>
                <WText
                  color="white"
                  font="regular20"
                  style={{
                    flex: 1,
                    alignSelf: "center",
                    marginRight: -width / 4
                  }}
                  children="Our honour"
                />
                <WText
                  color="white"
                  font="regular20"
                  style={{
                    alignSelf: "center",
                    marginLeft: -width / 4
                  }}
                  children="Your order,"
                />

                <WText
                  color="white"
                  font="bold30"
                  style={{
                    alignSelf: "center",
                    fontSize: 55,
                    marginTop: "10%"
                  }}
                  children="H.K"
                />
              </>
            }
          />
        </>
      }
    />
  );
};
export default LoginScreen;
const styles = StyleSheet.create({
  input: {
    width: "75%",
    borderRadius: 5,
    padding: 0,
    marginBottom: 35,
    marginTop: 5,
    fontFamily: R.fonts.medium,
    fontSize: 16,
    borderBottomWidth: 0.5,
    paddingVertical: 10
  },
  label: { width: "75%" },
  card: {
    alignItems: "center",
    backgroundColor: "white",
    height: "70%",
    borderTopLeftRadius: 50
  }
});
