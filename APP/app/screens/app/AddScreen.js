import React, { useRef, useState } from "react";
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
import { FaceDetector, RNCamera } from "react-native-camera";
import { Keyboard } from "react-native";
let isCallApiDone = true;
let isTakePhotoDone = true;

const AddScreen = props => {
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [faces, setFaces] = useState([]);
  const [isRecord, setRecord] = useState(false);
  const camera = useRef(null);

  const callApiAddPerson = () => {
    isCallApiDone = false;
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
      },
      onFinaly: () => {
        isCallApiDone = true;
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
            editable={!isRecord}
            placeholder="Tên nhân viên"
          />

          {isRecord && (
            <>
              <RNCamera
                ref={camera}
                type="front"
                style={{ width: "100%", height: "80%" }}
                onFacesDetected={res => {
                  if (images.length == 10) {
                    setRecord(false);
                    setImages([]);
                    setFaces([]);
                    if (isCallApiDone) callApiAddPerson();
                    return;
                  }
                  setFaces(res.faces);
                  if (res.faces.length > 0 && isTakePhotoDone) {
                    isTakePhotoDone = false;
                    camera.current
                      .takePictureAsync({ width: 1000 })
                      .then(res => {
                        const uri = res.uri;
                        let img = [...images];
                        img.push(uri);
                        setImages(img);
                        isTakePhotoDone = true;
                      });
                  }
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
            </>
          )}

          {!isRecord && (
            <TouchableOpacity
              onPress={() => {
                setRecord(true);
                Keyboard.dismiss();
              }}
              disabled={name.length == 0}
              style={{
                backgroundColor:
                  name.length == 0 ? colors.inactive : colors.primary,
                padding: 15,
                alignSelf: "center",
                borderRadius: 5,
                position: "absolute",
                top: height / 3
              }}
              children={
                <WText
                  style={{
                    paddingHorizontal: 30
                  }}
                  color={colors.white}
                  children="Bắt đầu"
                />
              }
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
)(AddScreen);
const styles = StyleSheet.create({});
