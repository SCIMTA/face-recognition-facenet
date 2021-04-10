const OneSignal = require("react-native-onesignal").default;
const reactotron = require("reactotron-react-native").default;
const AsyncStorage = require("@react-native-community/async-storage").default;
const NavigationUtil = require("@app/navigation/NavigationUtil").default;
const {
  ROLE,
  SCREEN_ROUTER_APP: SCREEN_ROUTER_ADMIN,
  SCREEN_ROUTER_SHOP
} = require("@constant");
const onReceived = notification => {};

const onOpened = async openResult => {
  const data = openResult.notification.payload.additionalData;
  const role = await AsyncStorage.getItem("role");
  if (role == ROLE.ADMIN) {
    NavigationUtil.navigate(SCREEN_ROUTER_ADMIN.MAIN, {
      ...data,
      show: true
    });
  } else {
    NavigationUtil.navigate(SCREEN_ROUTER_SHOP.LIST_ORDER, {
      ...data,
      show: true
    });
  }
};

const onIds = device => {
  console.log("Device info: ", device);
};
module.exports = {
  initialization: appId => {
    OneSignal.init(appId);
    OneSignal.addEventListener("received", onReceived);
    OneSignal.addEventListener("opened", onOpened);
    OneSignal.addEventListener("ids", onIds);
    OneSignal.inFocusDisplaying(2);
  },
  destruction: () => {
    OneSignal.removeEventListener("received", onReceived);
    OneSignal.removeEventListener("opened", onOpened);
    OneSignal.removeEventListener("ids", onIds);
  }
};
