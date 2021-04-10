import React, { useState } from "react";
import { StyleSheet, View, TextInputProps } from "react-native";
import R from "@app/assets/R";
import { colors, fonts } from "@app/constants/Theme";
import { TextInput } from "react-native";
import FastImg from "./FastImage";
import { FlatList } from "react-native";
import WText from "./WText";
import { callAPIHook } from "@app/utils/CallApiHelper";
import { search_client } from "@app/constants/Api";
import { TouchableOpacity } from "react-native";

interface ClientInfo {
  CLIENT_NAME;
  CLIENT_PHONE;
}

interface CustomProps {
  note: boolean;
  icon: number;
  searchClient?: (item: ClientInfo) => void;
}
type Props = CustomProps & TextInputProps;
let timeOutSearch = null;
export default (props: Props) => {
  const { note, icon, searchClient } = props;
  const [data, setData] = useState([]);

  return (
    <>
      {searchClient &&
        !!props.value &&
        data.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              setData([]);
              if (typeof searchClient == "function") searchClient(item);
            }}
            key={index}
            children={
              <WText
                color={colors.primaryDark}
                font="regular16"
                style={{
                  borderBottomWidth: 0.8,
                  borderRadius: 5,
                  padding: 10,
                  marginStart: 45
                }}
                children={item.CLIENT_NAME + " - " + item.CLIENT_PHONE}
              />
            }
          />
        ))}
      <View
        style={{ flexDirection: "row" }}
        children={
          <>
            <FastImg
              style={{
                width: 25,
                aspectRatio: 1,
                alignSelf: note ? "auto" : "center",
                marginStart: 10,
                marginTop: note ? 18 : 0
              }}
              source={icon}
              tintColor={colors.primaryDark}
            />
            <TextInput
              {...props}
              onChangeText={text => {
                props.onChangeText(text);
                if (searchClient && !!text) {
                  if (timeOutSearch) clearTimeout(timeOutSearch);
                  timeOutSearch = setTimeout(() => {
                    callAPIHook({
                      API: search_client,
                      payload: {
                        key_search: text
                      },
                      onSuccess: res => {
                        setData(res.data);
                      }
                    });
                  }, 1000);
                }
              }}
              style={[
                {
                  margin: 10,
                  borderRadius: 10,
                  borderBottomWidth: 1,
                  padding: 10,
                  width: "85%",
                  fontFamily: R.fonts.medium,
                  fontSize: 16,
                  marginBottom: props.multiline ? 100 : 10
                },
                props.style
              ]}
            />
          </>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({});
