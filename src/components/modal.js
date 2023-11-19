import React, { useState } from "react";
import { View, Text, Modal as RNModal, TouchableOpacity, StyleSheet } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/FontAwesome"; 

export default Modal = ({ message, btnYES, btnNO}) => {    
    const [visible, setVisible] = useState(true)
    
    const handleNoButtonPress = () => {                
        setVisible(false)        
    };
    return (
        <RNModal
            transparent={true}
            animationType="slide"
            visible={visible}            
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.message}>{message}</Text>

                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
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
                        </View>
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
    backgroundColor: "#79AC78", // Base color
    padding: wp("5%"),
    borderRadius: wp("2%"),
    width: wp("80%"),
  },
  message: {
    fontSize: wp("4.5%"),
    color: "#fff", // Text color
    marginBottom: wp("5%"),
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

