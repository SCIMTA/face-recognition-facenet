import React from "react";
import R from "@R";
import { Alert } from "react-native";
import { AlertButton } from "react-native";

export const showConfirm = (
  title,
  content,
  action?,
  textCancel?,
  textConfirm?
) => {
  Alert.alert(
    title,
    content,
    [
      {
        text: textCancel || "Huỷ",
        style: "cancel"
      },
      {
        text: textConfirm || "Xác nhận",
        onPress: action
      }
    ],
    { cancelable: false }
  );
};

export const showMessages = (title, content, action?) => {
  setTimeout(() => {
    Alert.alert(
      title,
      content,
      [
        {
          text: "OK",
          onPress: action
        }
      ],
      { cancelable: false }
    );
  }, 100);
};

export const showOption = (title, content = "", options?: AlertButton[]) => {
  setTimeout(() => {
    Alert.alert(title, content, options, { cancelable: true });
  }, 100);
};
