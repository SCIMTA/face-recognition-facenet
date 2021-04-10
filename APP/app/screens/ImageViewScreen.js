import React, { Component } from "react";
import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { Icon } from "react-native-elements";
import ImageViewer from "react-native-image-zoom-viewer";
import reactotron from "reactotron-react-native";
import NavigationUtil from "@app/navigation/NavigationUtil";
import FastImage from "@app/components/FastImage";
import { useEffect } from "react";

export default props => {
  const { setClose, setOpen } = props.navigation.state.params.props;
  let item = { ...props.navigation.state.params.props };
  delete item.setOpen;
  delete item.setClose;
  useEffect(() => {
    setClose();
  }, []);
  return (
    <>
      <ImageViewer
        imageUrls={[{ url: item.IMAGE_URL }]}
        menus={elem => {
          elem.cancel();
          return <></>;
        }}
        renderIndicator={(curIndex, size) => <Text />}
        enablePreload
        loadingRender={() => <ActivityIndicator />}
        renderImage={props => (
          <FastImage
            {...props}
            style={{ width: "100%", height: "97%", alignSelf: "center" }}
            resizeMode="contain"
          />
        )}
      />

      <TouchableOpacity
        style={{
          position: "absolute",
          top: 35,
          right: 10,
          backgroundColor: "rgba(225,225,225,0.6)",
          padding: 5,
          borderRadius: 10,
          overflow: "hidden"
        }}
        onPress={() => {
          setOpen(item);
          NavigationUtil.goBack();
        }}
      >
        <Icon type="ion-icon" name="close" size={30} color="black" />
      </TouchableOpacity>
    </>
  );
};
