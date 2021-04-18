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
import NavigationUtil from "@app/navigation/NavigationUtil";
import { SCREEN_ROUTER_APP } from "@app/constants/Constant";
import ModalView from "@app/components/ModalView";
import { ScrollView } from "react-native";
import { export_month_report } from "@app/constants/Api";
import { Linking } from "react-native";

let fullMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const MainScreen = props => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [visible, setVisible] = useState(false);
  useEffect(() => {}, []);

  const button = [
    {
      title: "Thêm",
      onPress: () => NavigationUtil.navigate(SCREEN_ROUTER_APP.ADD)
    },
    {
      title: "Bắt đầu",
      onPress: () => NavigationUtil.navigate(SCREEN_ROUTER_APP.ACTION)
    },
    {
      title: "Xuất excel",
      onPress: () => {
        setVisible(true);
      }
    }
  ];
  const callApiExportExcel = () => {
    Linking.openURL(
      `http://128.199.108.177:8002/export_month_report?month=${month}&year=${year}`
    );
    // callAPIHook({
    //   API: export_month_report,
    //   payload: {
    //     month,
    //     year
    //   },
    //   onSuccess: res => {
    //     console.log(res);
    //     setVisible(false);
    //   }
    // });
  };
  return (
    <ScreenComponent
      titleHeader="ATT"
      renderView={
        <>
          <ModalView
            setClose={setVisible}
            isVisible={visible}
            contentStyle={{ borderRadius: 10 }}
            contentView={
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginVertical: 20
                  }}
                  children={
                    <>
                      <View
                        children={
                          <>
                            <WText font="regular16" children="Chọn tháng" />
                            <ScrollView
                              style={{ height: 300, marginVertical: 15 }}
                              children={fullMonth.map(e => (
                                <TouchableOpacity
                                  style={{
                                    alignSelf: "center"
                                  }}
                                  onPress={() => {
                                    setMonth(e);
                                  }}
                                  key={e}
                                  children={
                                    <WText
                                      style={{
                                        textAlign: "center",
                                        textAlignVertical: "center",
                                        marginVertical: 8,
                                        borderWidth: 1,
                                        borderRadius: 60,
                                        width: 30,
                                        aspectRatio: 1,
                                        color:
                                          month == e
                                            ? colors.white
                                            : colors.primary,
                                        backgroundColor:
                                          month == e ? colors.primary : "white",
                                        borderColor: colors.primary
                                      }}
                                      children={e}
                                    />
                                  }
                                />
                              ))}
                            />
                          </>
                        }
                      />
                      <View
                        children={
                          <>
                            <WText font="regular16" children="Chọn năm" />
                            <ScrollView
                              style={{ height: 300, marginVertical: 15 }}
                              children={fullMonth
                                .map(val => new Date().getFullYear() - val + 1)
                                .map(e => (
                                  <TouchableOpacity
                                    style={{
                                      alignSelf: "center"
                                    }}
                                    onPress={() => {
                                      setYear(e);
                                    }}
                                    key={e}
                                    children={
                                      <WText
                                        style={{
                                          textAlign: "center",
                                          textAlignVertical: "center",
                                          marginVertical: 8,
                                          borderWidth: 1,
                                          borderRadius: 5,
                                          paddingHorizontal: 15,
                                          paddingVertical: 5,
                                          color:
                                            year == e
                                              ? colors.white
                                              : colors.primary,
                                          backgroundColor:
                                            year == e
                                              ? colors.primary
                                              : "white",
                                          borderColor: colors.primary
                                        }}
                                        children={e}
                                      />
                                    }
                                  />
                                ))}
                            />
                          </>
                        }
                      />
                    </>
                  }
                />
                <TouchableOpacity
                  onPress={callApiExportExcel}
                  children={
                    <WText
                      style={{
                        backgroundColor: colors.primary,
                        padding: 15,
                        alignSelf: "center",
                        marginBottom: 15,
                        borderRadius: 5
                      }}
                      color={colors.white}
                      font="regular16"
                      children="Xuất file"
                    />
                  }
                />
              </>
            }
          />
          {button.map(value => (
            <TouchableOpacity
              key={value.title}
              onPress={value.onPress}
              style={{
                alignSelf: "center",
                flex: 1,
                justifyContent: "center",
                backgroundColor: colors.primary,
                width: "80%",
                marginVertical: 20,
                borderRadius: 10
              }}
              children={
                <>
                  <WText
                    children={value.title}
                    style={{ textAlign: "center" }}
                  />
                </>
              }
            />
          ))}
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
)(MainScreen);
const styles = StyleSheet.create({});
