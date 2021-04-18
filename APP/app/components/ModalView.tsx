import React, { PureComponent } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  ViewStyle,
  StyleProp
} from "react-native";
import Modal from "react-native-modal";
import R from "@app/assets/R";
import { colors } from "@app/constants/Theme";
import FastImg from "./FastImage";

const { height, width } = Dimensions.get("window");

interface Props {
  isVisible: boolean;
  backdrop?: boolean;
  hideCloseButton?: boolean;
  setClose: (boolean) => void;
  onModalHide?: () => void;
  contentView: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
}

export default class ModalView extends PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  renderCloseButton = () => {
    const { setClose } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          if (setClose) setClose(false);
        }}
        style={{ position: "absolute", top: 5, right: 5, zIndex: 15 }}
        children={
          <FastImg
            style={{ width: 30, height: 30 }}
            source={R.images.ic_close}
            tintColor={"tomato"}
          />
        }
      />
    );
  };

  render() {
    const {
      contentView,
      isVisible,
      backdrop = true,
      setClose,
      onModalHide,
      contentStyle,
      hideCloseButton = false
    } = this.props;
    return (
      <Modal
        onModalHide={() => {
          if (onModalHide) onModalHide();
        }}
        isVisible={isVisible}
        onBackdropPress={() => {
          if (backdrop) setClose(false);
        }}
        backdropColor={"rgba(0,0,0,0.8)"}
        backdropOpacity={0.8}
        animationInTiming={500}
        animationOutTiming={500}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
      >
        <View style={[styles.contentStyle, contentStyle]}>
          {!hideCloseButton && this.renderCloseButton()}
          {contentView}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  contentStyle: {
    width: width * 0.9,
    backgroundColor: "white",
    borderRadius: 0,
    alignSelf: "center",
    padding: 0
  }
});
