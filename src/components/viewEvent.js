import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import fetchSquareImage from "./imagefetchAPI";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import GlobalIconButton from "./globalIconButton";
import { LinearGradient } from "expo-linear-gradient";
import Modal from "react-native-modal";
import Header from "./header";
import ListView from "./listView";
import ProfileCard from "./profileCard";
import Attendees from "../screens/attendees";
import { globalStyles } from "../styles/globalStyles";
import Button from "./button";

const ViewEvent = ({ route, navigation }) => {
  const {
    title,
    location,
    description,
    dateTime,
    joinReasons,
    id,
    participants,
    fullname,
    user,
    user_id,
    role,
  } = route.params;

  const [imageURL, setImageURL] = useState("");
  const [isModalVisible, setModalVisible] = useState(true);
  const [isParticipantsModalVisible, setParticipantsModalVisible] =
    useState(false);

  const hideModal = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  const [isAttendeesModalVisible, setAttendeesModalVisible] = useState(false);

  const showAdminModal = () => {
    setAttendeesModalVisible(true);
  };

  useEffect(() => {
    async function fetchImage() {
      try {
        const url = await fetchSquareImage(title);
        setImageURL(url);
      } catch (error) {
        console.error(error);
      }
    }

    fetchImage();
  }, []);

  const showParticipantsModal = () => {
    setParticipantsModalVisible(true);
  };

  const hideParticipantsModal = () => {
    setParticipantsModalVisible(false);
  };
  // console.log(dateTime);
  const dateTimeArray = dateTime.split(" ");
  const date = dateTimeArray.slice(0, 3).join(" ");
  const time = dateTimeArray.slice(3).join(" ");

  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [iconType, setIconType] = useState("outlined-star");

  const handleIconButtonPress = () => {
    console.log("Star icon pressed");
    setIconType((prevIconType) =>
      prevIconType === "outlined-star" ? "solid-star" : "outlined-star"
    );
  };

  return (
    <View>
      <Modal isVisible={isModalVisible} onBackdropPress={hideModal}>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            {imageURL !== "" && (
              <Image
                source={{ uri: imageURL }}
                style={styles.backgroundImage}
              />
            )}
            {role === "user" && (
              <View style={styles.starIconContainer}>
                <View style={styles.starIconBg}>
                  <GlobalIconButton
                    iconType={iconType}
                    color="#7D9C65"
                    onPressed={handleIconButtonPress}
                  />
                </View>
              </View>
            )}
            <LinearGradient
              colors={["rgba(247,249,248,0)", "rgba(125,156,101,1)"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.dateTimeContainer}
            >
              <Text
                style={{
                  fontFamily: globalStyles.fontStyle.bold,
                  fontSize: globalStyles.fontSize.header,
                  color: "white",
                }}
              >
                {title || "Sample Title"}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: hp("5%"),
                  // marginTop: hp("1%"),
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    // marginTop: hp("1%"),
                  }}
                >
                  <FontAwesomeIcon name="calendar" style={styles.dateIcon} />
                  <Text
                    style={{
                      fontFamily: globalStyles.fontStyle.regular,
                      fontSize: globalStyles.fontSize.description,
                      color: "white",
                    }}
                  >
                    {date}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    // marginTop: hp("1%"),
                  }}
                >
                  <FontAwesomeIcon name="clock-o" style={styles.timeIcon} />
                  <Text
                    style={{
                      fontFamily: globalStyles.fontStyle.regular,
                      fontSize: globalStyles.fontSize.description,
                      color: "white",
                    }}
                  >
                    {time}
                  </Text>
                </View>
              </View>
            </LinearGradient>
            <View style={styles.bottomContent}>
              <View style={{ maxHeight: hp("55%") }}>
                <ScrollView>
                  <View>
                    <Text
                      style={{
                        fontFamily: globalStyles.fontStyle.semiBold,
                        fontSize: hp("1.7%"),
                        color: "white",
                      }}
                    >
                      Description
                    </Text>
                    <Text
                      style={{
                        fontFamily: globalStyles.fontStyle.regular,
                        fontSize: hp("1.5%"),
                        color: "white",
                      }}
                    >
                      {description || "No description provided"}
                    </Text>
                  </View>
                  <View style={{ marginTop: hp("1.5%") }}>
                    <Text
                      style={{
                        fontFamily: globalStyles.fontStyle.semiBold,
                        fontSize: hp("1.7%"),
                        color: "white",
                      }}
                    >
                      Why you should join us:
                    </Text>
                    {/* Render bullet points for reasons */}
                    {joinReasons.map((reason, index) => (
                      <Text
                        key={index}
                        style={{
                          fontFamily: globalStyles.fontStyle.regular,
                          fontSize: hp("1.5%"),
                          color: "white",
                        }}
                      >
                        - {reason || "No reasons provided"}
                      </Text>
                    ))}
                  </View>
                </ScrollView>
              </View>
              <View
                style={{
                  marginTop: hp("1.5%"),
                  flexDirection: "row",
                  gap: 5,
                }}
              >
                <FontAwesomeIcon
                  name="map-marker"
                  style={styles.locationIcon}
                />
                <Text
                  style={{
                    fontFamily: globalStyles.fontStyle.semiBold,
                    fontSize: hp("1.7%"),
                    color: "white",
                  }}
                >
                  {location || "No location provided"}
                </Text>
              </View>

              {/* Attendees button */}
              <View style={{ marginTop: hp("1.5%") }}>
                <Text
                  style={{
                    fontFamily: globalStyles.fontStyle.semiBold,
                    fontSize: hp("1.7%"),
                    color: "white",
                  }}
                >
                  Invited Participants
                </Text>
                <Text
                  style={{
                    fontFamily: globalStyles.fontStyle.regular,
                    fontSize: hp("1.5%"),
                    color: "white",
                  }}
                >
                  {participants
                    .map((participant) => participant.fullname)
                    .join(", ")}
                  {/* {participants} */}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 15,
                    marginTop: hp("3%"),
                  }}
                >
                  <Button
                    text={"Participants"}
                    onPress={showParticipantsModal}
                    width={wp("35%")}
                    bgColor="rgba(255, 255, 255, 0.5)"
                    textColor="rgba(0, 0, 0, 0.5)"
                  />
                  <Button
                    text={role === "admin" ? "Attendees" : "Attendance"}
                    onPress={showAdminModal}
                    width={wp("35%")}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* Pariticipants */}
      <Modal
        isVisible={isParticipantsModalVisible}
        onBackdropPress={hideParticipantsModal}
      >
        {/* Add your code to display participants here */}
        {/* <View style={styles.participantsModalContainer}>
        </View> */}
        <View
          style={{
            backgroundColor: globalStyles.colors.green200,
            padding: 20,
            height: hp("75%"),
            borderRadius: wp("4%"),
          }}
        >
          <View style={{ height: hp("5%"), marginBottom: hp("1%") }}>
            <Header
              title={"Participants"}
              icon={"back"}
              onBack={hideParticipantsModal}
            />
          </View>
          <View style={{ height: hp("64%"), marginBottom: hp("1%") }}>
            <ListView
              data={participants}
              renderItem={({ item }) => (
                <ProfileCard
                  fullname={item.fullname}
                  id={item.id}
                  verify={true}
                  // onParticipantSelect={handleParticipantSelect}
                  purpose={"view"}
                />
              )}
            />
          </View>
          {/* <View style={{ height: hp("5%") }}>
            <Button text={"Remove"} 
            onPress={removeParticipant} /> 
          </View> */}
        </View>
      </Modal>
      <Modal
        isVisible={isAttendeesModalVisible}
        onBackdropPress={() => setAttendeesModalVisible(false)}
      >
        <View
          style={{
            // flex: role === "user" ? 1 : undefined,
            height: role === "admin" ? hp("90%") : null,
          }}
        >
          <Attendees
            role={role}
            userName={role === "user" ? fullname : null}
            userTag={role === "user" ? user : null}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    marginBottom: hp("2%"),
  },
  imageContainer: {
    width: wp("90%"),
    height: wp("90%") * 2,
    borderRadius: wp("3%"),
    overflow: "hidden",
    position: "relative",
  },
  backgroundImage: {
    height: hp("45%"),
    resizeMode: "cover",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  bottomContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#7D9C65",
    height: "55%", // Set the height to 55% of the image container
    padding: wp("5%"),
  },
  joinUsContainer: {},
  joinUsTitle: {
    fontFamily: "montserrat-semiBold",
    fontWeight: "bold",
    marginBottom: hp("1%"),
    fontSize: wp("4%"),
    color: "#333333",
  },
  bullet: {
    fontFamily: "montserrat-regular",
    color: "#333333",
    fontSize: wp("4%"),
  },
  dateTimeContainer: {
    position: "absolute",
    bottom: wp("99%"),
    height: hp("12%"),
    left: 0,
    right: 0,
    // flexDirection: "row",
    // justifyContent: "",
    // backgroundColor: "rgba(255, 255, 255, 0.8)",
    // alignItems: "center",
    padding: wp("5%"),
  },
  attendeesButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginTop: hp("2%"),
  },
  attendeesButtonText: {
    fontFamily: "montserrat-bold",
    color: "#7D9C65",
    fontSize: wp("4%"),
    fontWeight: "bold",
  },
  dateIcon: {
    fontSize: wp("3.5%"),
    color: "white",
  },
  timeIcon: {
    marginLeft: wp("2%"),
    fontSize: wp("3.5%"),
    color: "white",
  },
  locationIcon: {
    fontSize: wp("5%"),
    color: "#Ffffff",
  },
  // locationText: {
  //   fontFamily: "montserrat-bold",
  //   fontSize: wp("4%"),
  //   marginLeft: wp("1%"),
  //   color: "#Ffffff",
  // },
  // dateTimeText: {
  //   fontFamily: "montserrat-bold",
  //   fontSize: wp("4%"),
  //   marginLeft: wp("1%"),
  //   color: "white",
  // },
  starIconContainer: {
    position: "absolute",
    top: wp("6%"), // Adjust the top position as needed
    right: wp("6%"), // Adjust the right position as needed
  },
  starIconBg: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: wp("25%"), // Adjust the radius to make it circular
    width: wp("12%"), // Set the width and height as per the buttonSize
    height: wp("12%"),
    alignItems: "center",
    justifyContent: "center",
  },

  participantsModalContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: wp("3%"),
    padding: wp("4%"),
  },
  participantsModalTitle: {
    fontFamily: "montserrat-bold",
    fontSize: wp("6%"),
    color: "#333333",
    marginBottom: hp("2%"),
  },
  participantName: {
    fontFamily: "montserrat-regular",
    fontSize: wp("4%"),
    color: "#333333",
    marginBottom: hp("1%"),
  },
});

export default ViewEvent;
