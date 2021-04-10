import { Dimensions } from "react-native";

const dimension = ({ width, height } = Dimensions.get("window"));

const colors = {
  white: "#ffffff",
  primary: "#B57EDC",
  primaryDark: "#7e5799",
  bottombarBg: "#fafafa",
  headerColor: "#B57EDC",
  headerTitle: "#FFFF",
  active: "#B57EDC",
  defaultBg: "#f3f4f6",
  inactive: "gray",
  indicator: "#24277e",
  borderTopColor: "gainsboro",
  red: "red"
};

const sizes = {};

const fonts = {
  italic12: {
    fontSize: 12,
    fontFamily: "Roboto-Italic"
  },
  italic14: {
    fontSize: 14,
    fontFamily: "Roboto-Italic"
  },
  italic16: {
    fontSize: 16,
    fontFamily: "Roboto-Italic"
  },
  italic18: {
    fontSize: 18,
    fontFamily: "Roboto-Italic"
  },
  italic20: {
    fontSize: 20,
    fontFamily: "Roboto-Italic"
  },
  italic24: {
    fontSize: 24,
    fontFamily: "Roboto-Italic"
  },
  italic30: {
    fontSize: 30,
    fontFamily: "Roboto-Italic"
  },
  bold12: {
    fontFamily: "Roboto-Bold",
    fontSize: 12
  },
  bold14: {
    fontFamily: "Roboto-Bold",
    fontSize: 14
  },
  bold16: {
    fontFamily: "Roboto-Bold",
    fontSize: 16
  },
  bold18: {
    fontFamily: "Roboto-Bold",
    fontSize: 18
  },
  bold20: {
    fontFamily: "Roboto-Bold",
    fontSize: 20
  },
  bold24: {
    fontFamily: "Roboto-Bold",
    fontSize: 24
  },
  bold30: {
    fontFamily: "Roboto-Bold",
    fontSize: 30
  },

  regular12: {
    fontFamily: "Roboto-Regular",
    fontSize: 12
  },
  regular14: {
    fontFamily: "Roboto-Regular",
    fontSize: 14
  },
  regular16: {
    fontFamily: "Roboto-Regular",
    fontSize: 16
  },
  regular18: {
    fontFamily: "Roboto-Regular",
    fontSize: 18
  },
  regular20: {
    fontFamily: "Roboto-Regular",
    fontSize: 20
  },
  regular24: {
    fontFamily: "Roboto-Regular",
    fontSize: 24
  },
  regular30: {
    fontFamily: "Roboto-Regular",
    fontSize: 30
  }
};

export { colors, sizes, fonts, dimension };
