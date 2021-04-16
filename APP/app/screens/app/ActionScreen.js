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
import FastImg from "@app/components/FastImage";
import { RNCamera, FaceDetector } from "react-native-camera";
import { useRef } from "react";
import { upload_predict } from "@app/constants/Api";
import reactotron from "@app/reactotron/ReactotronConfig";
import { ScrollView } from "react-native";
let timeOut = null;
let isCallApiPredictDone = true;
const ActionScreen = props => {
  const [faces, setFaces] = useState([]);
  const [labels, setLabels] = useState([]);
  const camera = useRef(null);
  useEffect(() => {}, []);

  return (
    <ScreenComponent
      back
      titleHeader="Điểm danh"
      renderView={
        <>
          <RNCamera
            ref={camera}
            type="front"
            style={{ width: "100%", height: "80%" }}
            onFacesDetected={res => {
              if (timeOut) clearTimeout(timeOut);
              setFaces(res.faces);
              // console.log("face_detect");
              if (isCallApiPredictDone) {
                isCallApiPredictDone = false;
                camera.current.takePictureAsync({ width: 600 }).then(res => {
                  const uri = res.uri;
                  callAPIHook({
                    API: upload_predict,
                    formdata: {
                      file: {
                        uri: uri,
                        name: uri.split("/").pop(),
                        type: "image/jpeg",
                        filename: new Date().getTime() + `.jpeg`
                      }
                    },
                    onSuccess: res => {
                      console.log(res);
                      if (res.data) {
                        setLabels(
                          labels
                            .concat(
                              res.data.map(e => ({
                                label: e.label,
                                time: new Date().toLocaleTimeString()
                              }))
                            )
                            .reverse()
                        );
                      }
                    },
                    onError: err => {
                      console.log(err);
                    },
                    onFinaly: () => {
                      isCallApiPredictDone = true;
                    }
                  });
                });
              }
              timeOut = setTimeout(() => {
                setFaces([]);
              }, 500);
            }}
            faceDetectionMode={FaceDetector.Constants.Mode.accurate}
            faceDetectionLandmarks={FaceDetector.Constants.Landmarks.all}
            faceDetectionClassifications={
              FaceDetector.Constants.Classifications.all
            }
          />
          {faces.map((e, i) => (
            <View
              key={i}
              style={{
                position: "absolute",
                zIndex: 999,
                borderWidth: 1,
                borderColor: "white",
                top: e.bounds.origin.y,
                left: e.bounds.origin.x,
                height: e.bounds.size.height,
                width: e.bounds.size.width
              }}
            />
          ))}
          <ScrollView
            horizontal
            children={labels.map(e => (
              <View style={{ justifyContent: "center" }}>
                <WText
                  style={{
                    margin: 10,
                    textAlignVertical: "center"
                  }}
                  children={e.label}
                />
                <WText
                  style={{
                    margin: 10,
                    textAlignVertical: "center"
                  }}
                  children={e.time}
                />
              </View>
            ))}
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
)(ActionScreen);
const styles = StyleSheet.create({});
