import React, { useState } from "react";
import { connect } from "react-redux";
import ScreenComponent from "@app/components/ScreenComponent";
import { StyleSheet } from "react-native";
import { callAPIHook } from "@app/utils/CallApiHelper";
import { useEffect } from "react";

const AdminStatisticScreen = props => {
  useEffect(() => {}, []);

  return <ScreenComponent titleHeader={"Thống kê"} renderView={<></>} />;
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminStatisticScreen);
const styles = StyleSheet.create({});
