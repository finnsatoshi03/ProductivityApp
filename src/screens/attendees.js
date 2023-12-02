import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { globalStyles } from "./../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Header from "./../components/header";
import ListView from "../components/listView";
import Modal from "react-native-modal";
import Button from "./../components/button";

export default function Attendees({ navigation }) {
  return (
    <>
      <View>
        <Text>Sample</Text>
      </View>
    </>
  );
}
