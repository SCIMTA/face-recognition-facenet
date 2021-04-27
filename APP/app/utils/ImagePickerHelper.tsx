import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import { Platform, PermissionsAndroid } from "react-native";

const imagePickerHelper = async (res, numPic = 1) => {
  if (Platform.OS != "ios") {
    const isRead = await PermissionsAndroid.check(
      "android.permission.READ_EXTERNAL_STORAGE"
    );
    const isWrite = await PermissionsAndroid.check(
      "android.permission.WRITE_EXTERNAL_STORAGE"
    );
    const isGrantCamera = await PermissionsAndroid.check(
      "android.permission.CAMERA"
    );
    if (isRead && isWrite && isGrantCamera) {
      startPickImage(result => {
        if (res) res(result);
      }, numPic);
    } else {
      PermissionsAndroid.requestMultiple([
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.CAMERA"
      ]).finally(() => {
        imagePickerHelper(res, numPic);
      });
    }
  } else {
    startPickImage(result => {
      if (res) res(result);
    }, numPic);
  }
};

const startPickImage = (res, numPic, i = 0, list_res = []) => {
  if (numPic == i && res) {
    res(list_res);
    return;
  }
  try {
    launchCamera(
      {
        maxWidth: 800,
        maxHeight: 800,
        mediaType: "photo",
        cameraType: "front",
        includeBase64: false,
        saveToPhotos: false
      },
      async response => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorMessage) {
          console.log("ImagePicker Error: ", response.errorMessage);
        } else {
          var actualWidth = response.width,
            actualHeight = response.height;

          var uri =
            Platform.OS === "android"
              ? response.uri
              : response.uri.replace("file://", "");
          // return await _resizeImage(uri);
          return startPickImage(res, numPic, i + 1, list_res.concat(uri));
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
  return null;
};

const _resizeImage = async uri => {
  var url = null;
  try {
    // const response = await ImageResizer.createResizedImage(
    //   uri,
    //   actualWidth,
    //   actualHeight,
    //   "JPEG",
    //   60,
    //   270 + 90
    // );
    // console.log("resize success");
    // url = response.uri;
    url = uri;
  } catch (error) {
    console.log("resize err: " + error);
    url = uri;
  }
  url = Platform.OS === "ios" ? url.replace("file://", "") : url;
  // if (typeof res) res(url);
  return url;
};

export default imagePickerHelper;
