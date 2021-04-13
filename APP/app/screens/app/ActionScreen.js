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
import ViewShot from "react-native-view-shot";
import FastImg from "@app/components/FastImage";
import { RNCamera, FaceDetector } from "react-native-camera";
import { useRef } from "react";
let timeOut = null;
const ActionScreen = props => {
  const [faces, setFaces] = useState([]);
  const camera = useRef(null);
  const viewShot = useRef(null);
  const [image, setImage] = useState(null);
  useEffect(() => {
    // console.log(camera.current);
  }, []);

  return (
    <ScreenComponent
      back
      titleHeader="Thêm"
      renderView={
        <>
          <RNCamera
            ref={camera}
            type="front"
            style={{ width: "100%", height: "50%" }}
            onFacesDetected={async res => {
              if (timeOut) clearTimeout(timeOut);
              setFaces(res.faces);

              console.log("===========================");
              console.log(res.faces[0].bounds.origin);
              console.log(res.faces[0].bounds.size);
              timeOut = setTimeout(() => {
                setFaces([]);
              }, 300);
              try {
                if (!viewShot.current) return;
                const uri = await viewShot.current.capture();
                console.log(uri);
                setImage(uri);
              } catch (error) {}
            }}
            faceDetectionMode={"accurate"}
            faceDetectionLandmarks={"none"}
            faceDetectionClassifications={"none"}
          />
          {faces.length > 0 && (
            <ViewShot
              ref={viewShot}
              captureMode="update"
              // options={{ result: "" }}
              style={{
                position: "absolute",
                zIndex: 999,
                borderWidth: 1,
                borderColor: "white",
                top: faces[0].bounds.origin.y,
                left: faces[0].bounds.origin.x,
                height: faces[0].bounds.size.height,
                width: faces[0].bounds.size.width
              }}
            >
              <View />
            </ViewShot>
          )}
          {!!image && (
            <FastImg
              source={{ uri: image }}
              style={{
                width: "100%",
                height: "20%",
                backgroundColor: colors.primary,
                marginTop: 80
              }}
            />
          )}
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
)(ActionScreen);
const styles = StyleSheet.create({});
