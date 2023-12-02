import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Background from "../background";
import HeroMessage from "../heroMessage";
import InputFields from "../input";
import Label from "../globalLabel";
import VerifyButton from "../button";
import Modal from "react-native-modal";

import axios from "axios";
import "../../../global";

// TODO: add the reason of failed creation
export default function SignupForm({ navigation }) {
  const [formdata, setData] = useState({
    username: "",
    password: "",
    fullname: "",
    employment_id: "",
    office: "",
    email: "",
    contact: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    fullname: "",
    employment_id: "",
    office: "",
    email: "",
    contact: "",
  });

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalHeaderText, setModalHeaderText] = useState("");
  const [isLoading, setLoading] = useState(false);

  const data = [
    { label: "Office of the Municipal Mayor", value: "municipal_mayor" },
    {
      label: "Office of the Municipal Vice Mayor",
      value: "municipal_vice_mayor",
    },
    {
      label: "Office of the Sangguniang Bayan Legislative",
      value: "sangguniang_bayan_legislative",
    },
    {
      label: "Office of the Sangguniang Bayan Secretariat",
      value: "sangguniang_bayan_secretariat",
    },
    {
      label: "Business Permit and Licensing Office",
      value: "business_permit_licensing",
    },
    {
      label: "Human Resource Management Office",
      value: "human_resource_management",
    },
    { label: "Municipal Accounting Office", value: "municipal_accounting" },
    { label: "Municipal Agriculture Office", value: "municipal_agriculture" },
    { label: "Municipal Assessor's Office", value: "municipal_assessors" },
    { label: "Municipal Budget Office", value: "municipal_budget" },
    {
      label: "Office of the Municipal Civil Registrar",
      value: "municipal_civil_registrar",
    },
    {
      label: "Municipal Disaster Risk Reduction and Management Office",
      value: "municipal_drrmo",
    },
    { label: "Municipal Engineering Office", value: "municipal_engineering" },
    { label: "Municipal Health Office", value: "municipal_health" },
    {
      label: "Municipal Planning & Development Office",
      value: "municipal_planning_development",
    },
    {
      label: "Municipal Social Welfare and Development Office",
      value: "municipal_social_welfare",
    },
    {
      label: "Municipal Traffic and Public Safety Office",
      value: "municipal_traffic_safety",
    },
    { label: "Municipal Treasurer's Office", value: "municipal_treasurer" },
    { label: "Municipal Tourism Office", value: "municipal_tourism" },
    {
      label: "Municipal Environment and Natural Resources (MENRO)",
      value: "municipal_menro",
    },
    {
      label: "Municipal Disaster Risk Reduction and Management Office (MDRRMO)",
      value: "municipal_drrmo",
    },
    {
      label: "Municipal Property and Supply Office",
      value: "municipal_property_supply",
    },
    {
      label: "Municipal Human Resource Office",
      value: "municipal_human_resource",
    },
  ];

  const SignUpLabel = ({ text, error }) => (
    <Label
      text={error ? error : text}
      color={error ? "red" : "black"}
      zIndex={true}
      textAlign={"left"}
      flexStart={true}
      fontFamily={globalStyles.fontStyle.semiBold}
      style={{ marginBottom: 2 }}
    />
  );

  const handleInputChange = (field, value) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    const validationFunctions = {
      password: (val) =>
        val.length < 8 && "Password must be at least 8 characters long",
      fullname: (val) =>
        val.trim() === ""
          ? "Full name is required"
          : val.trim().length < 2
          ? "Full name must be at least 2 characters long"
          : !val.includes(" ")
          ? "Full name must include both a first name and a last name"
          : "",
      employment_id: (val) => val.trim() === "" && "Employment ID is required",
      email: (val) =>
        val.trim() === ""
          ? "Email is required"
          : !/\S+@\S+\.\S+/.test(val) && "Invalid email address",
      contact: (val) =>
        val.trim() === ""
          ? "Number is required"
          : !/^09[0-9]{9}$/.test(val) && "Invalid contact number",
    };

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: validationFunctions[field]
        ? validationFunctions[field](value)
        : "",
    }));
  };

  const onSubmit = async () => {
    setLoading(true);
    const errorFields = Object.keys(errors).filter((field) => errors[field]);
    setErrors((prevErrors) => ({
      ...prevErrors,
      username: !formdata.username.trim() ? "Username is required" : "",
      password: !formdata.password.trim() ? "Password is required" : "",
      fullname: !formdata.fullname.trim() ? "Full name is required" : "",
      employment_id: !formdata.employment_id.trim()
        ? "Employment ID is required"
        : "",
      office: !formdata.office.trim() ? "Designated is required" : "",
      email: !formdata.email.trim() ? "Email is required" : "",
      contact: !formdata.contact.trim() ? "Number is required" : "",
    }));

    if (errorFields.length === 0) {
      console.log(formdata);
      console.log("submitting");

      setModalVisible(true);
      setTimeout(async () => {
        const baseurl = `${global.baseurl}:4000/register`;
        try {
          const response = await axios.post(baseurl, formdata);

          if (response.status === 200) {
            console.log("success");
            setModalHeaderText("Congratulations! 🎉");
            setModalText(
              "Your account has been successfully created. Welcome to ProductivityApp. Start exploring and make the most of your experience!"
            );
          }
        } catch (error) {
          console.log(error);
          setModalHeaderText("Oops! 🚨");
          setModalText("Error submitting the form. Please try again.");
        }
        setLoading(false);
      }, 1500);
    } else {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {}, [errors]);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={globalStyles.container}>
            <View style={{ flex: 1 }}>
              <Background topProperty={"0%"} />
              <View
                style={{
                  zIndex: 2,
                  flexDirection: "row",
                  paddingVertical: 30,
                  justifyContent: "space-between",
                  // backgroundColor: "red",
                  height: hp("10%"),
                }}
              >
                <Pressable onPress={() => navigation.goBack()}>
                  <Image
                    style={{ height: hp("4%"), width: hp("4%") }}
                    source={require("../../../assets/back.png")}
                  />
                </Pressable>
                <Image
                  style={{ height: hp("4%"), width: hp("4%") }}
                  source={require("../../../assets/logo.png")}
                />
              </View>
              <View
                style={{
                  marginBottom: hp("2%"),
                  // backgroundColor: "blue",
                  zIndex: 4,
                  height: hp("17%"),
                }}
              >
                <HeroMessage
                  header={"Account Verification"}
                  description={"Join us and make your agenda more productive!"}
                  textAlign={true}
                  noPadding={true}
                  width={true}
                />
              </View>
              <View
                style={{
                  // marginBottom: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "green",
                  height: hp("55%"),
                  zIndex: 4,
                }}
              >
                <SignUpLabel text="Username *" error={errors.username} />
                {/* {takenUsername && (
                <Text style={{ color: "red" }}>
                  Username is already taken. Please choose another.
                </Text>
              )} */}
                <InputFields
                  placeholder="Your chosen username"
                  maxWidth={true}
                  margin={true}
                  value={formdata.username}
                  onChangeText={(value) => handleInputChange("username", value)}
                />
                <SignUpLabel text="Password *" error={errors.password} />
                <InputFields
                  placeholder="Your secure password"
                  maxWidth={true}
                  secureTextEntry={true}
                  margin={true}
                  value={formdata.password}
                  onChangeText={(value) => handleInputChange("password", value)}
                />
                <SignUpLabel text="Fullname *" error={errors.fullname} />
                <InputFields
                  placeholder="Your full name"
                  maxWidth={true}
                  margin={true}
                  value={formdata.fullname}
                  onChangeText={(value) => handleInputChange("fullname", value)}
                />
                <SignUpLabel
                  text="Employment ID *"
                  error={errors.employment_id}
                />
                <InputFields
                  placeholder="Your unique employee ID"
                  maxWidth={true}
                  margin={true}
                  value={formdata.employment_id}
                  onChangeText={(value) =>
                    handleInputChange("employment_id", value)
                  }
                />
                <SignUpLabel text="Designated Office *" error={errors.office} />
                <InputFields
                  maxWidth={true}
                  isDropdown={true}
                  data={data}
                  margin={true}
                  placeholder={"Your office location"}
                  value={formdata.office}
                  onChangeText={(value) => handleInputChange("office", value)}
                  onValueChange={(value) => handleInputChange("office", value)}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 15,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <SignUpLabel text="Email Account *" error={errors.email} />
                    <InputFields
                      placeholder="Your email address"
                      noWidth={wp("43%")}
                      value={formdata.email}
                      onChangeText={(value) =>
                        handleInputChange("email", value)
                      }
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <SignUpLabel
                      text="Contact Number *"
                      error={errors.contact}
                    />
                    <InputFields
                      placeholder="Your contact number"
                      noWidth={wp("43%")}
                      value={formdata.contact}
                      onChangeText={(value) =>
                        handleInputChange("contact", value)
                      }
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  zIndex: 4,
                  marginTop: hp("3%"),
                  // backgroundColor: "violet",
                  flex: 1,
                  // height: hp("13%"),
                }}
              >
                <VerifyButton
                  text="VERIFY ACCOUNT"
                  onPress={onSubmit}
                  fnc={"press"}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 5,
                  }}
                >
                  <Text>Already verified your account?</Text>
                  <Pressable
                    style={{ alignItems: "center" }}
                    onPress={() => navigation.goBack()}
                  >
                    <Text style={{ fontWeight: "bold" }}> Login</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal
        isVisible={
          isModalVisible && !Object.values(errors).some((error) => error !== "")
        }
        onBackdropPress={closeModal}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <View
          style={{
            width: wp("70%"),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: hp("3%"),
            padding: 20,
          }}
        >
          {isLoading ? (
            <View style={{ padding: 20 }}>
              <ActivityIndicator
                size="large"
                color={globalStyles.colors.green}
                style={{ marginBottom: 20 }}
              />
              <Text
                style={{
                  fontFamily: globalStyles.fontStyle.regular,
                  fontSize: globalStyles.fontSize.description,
                  textAlign: "center",
                  marginTop: 20,
                }}
              >
                Verifying and processing your registration information. Please
                wait a moment...
              </Text>
            </View>
          ) : (
            <>
              <Text
                style={{
                  fontFamily: globalStyles.fontStyle.bold,
                  fontSize: globalStyles.fontSize.subHeader,
                  marginBottom: 10,
                }}
              >
                {modalHeaderText}
              </Text>
              <Text
                style={{
                  fontFamily: globalStyles.fontStyle.regular,
                  fontSize: globalStyles.fontSize.description,
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                {modalText}
              </Text>
              {modalHeaderText === "Congratulations! 🎉" ? (
                <VerifyButton
                  text={"Let's Login!"}
                  width={wp("30%")}
                  onPress={() => navigation.replace("User")}
                />
              ) : (
                <VerifyButton
                  text={"Let's Try Again"}
                  width={wp("35%")}
                  onPress={closeModal}
                />
              )}
            </>
          )}
        </View>
      </Modal>
    </>
  );
}
