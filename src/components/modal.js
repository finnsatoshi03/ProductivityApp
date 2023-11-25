import React from "react";
import {
  View,
  Text,
  Modal as RNModal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Button from "./button";
import Icon from "react-native-vector-icons/FontAwesome";
import { globalStyles } from "../styles/globalStyles";

const Modal = ({ message, btnYES, visible, setVisible }) => {
  const handleNoButtonPress = () => {
    setVisible(false);
  };
  return (
    <RNModal transparent={true} animationType="slide" visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Button
                text={"Yes"}
                onPress={btnYES}
                width={wp("30")}
                bgColor="rgba(255,255,255,0.3)"
                textColor="black"
              />
              <Button text={"No"} onPress={setVisible} width={wp("30")} />
            </View>
            {/* <View style={styles.button}>
              <TouchableOpacity onPress={btnYES}>
                <Icon name="check" size={wp("4%")} color="#79AC78" />
              </TouchableOpacity>
              <Text style={styles.buttonText}> YES</Text>
            </View>
            <View style={styles.button}>
              <TouchableOpacity onPress={handleNoButtonPress}>
                <Icon name="times" size={wp("4%")} color="#79AC78" />
              </TouchableOpacity>
              <Text style={styles.buttonText}> NO</Text>
            </View> */}
          </View>
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    backgroundColor: globalStyles.colors.green, // Base color
    padding: wp("5%"),
    borderRadius: wp("5%"),
    width: wp("80%"),
  },
  message: {
    fontFamily: globalStyles.fontStyle.regular,
    fontSize: wp("4%"),
    color: "#fff", // Text color
    marginBottom: wp("5%"),
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: wp("3%"),
    borderRadius: wp("2%"),
  },
  buttonText: {
    color: "#79AC78", // Text color
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Modal;
