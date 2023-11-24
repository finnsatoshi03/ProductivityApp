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
import { globalStyles } from "../styles/globalStyles";
import Button from "./button";

const ViewEvent = ({ route, navigation }) => {
  const { title, location, description, dateTime, joinReasons, id } = route.params;
  const [imageURL, setImageURL] = useState("");
  const [isModalVisible, setModalVisible] = useState(true);
  const [isParticipantsModalVisible, setParticipantsModalVisible] = useState(false);
    
  const hideModal = () => {
    setModalVisible(false);
    navigation.goBack();
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
  }, [title]);

  const showParticipantsModal = () => {
    setParticipantsModalVisible(true);
  };

  const hideParticipantsModal = () => {
    setParticipantsModalVisible(false);
  };
  const dateTimeArray = dateTime.split(' ');
  const date = dateTimeArray.slice(0, 3).join(' ');
  const time = dateTimeArray.slice(3).join(' ');
  
  

  const [selectedParticipant, setSelectedParticipant] = useState(null);

  const handleParticipantSelect = (participant) => {
    setSelectedParticipant(participant);
  };

  // const removeParticipant = () => {
  //   if (selectedParticipant) {
  //     const updatedParticipants = participants
  //       .split(", ")
  //       .filter((participant) => participant !== selectedParticipant);
  //     navigation.setParams({ participants: updatedParticipants.join(", ") });
  //     setSelectedParticipant(null); // Clear the selection
  //   }
  // };

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
            <View style={styles.trashIconContainer}>
              {/* Circular background behind Trash Icon */}
              <View style={styles.trashIconBackground}>
                <GlobalIconButton
                  iconType="trash"
                  color="#7D9C65"
                  onPressed={() => {
                    // Handle trash icon button press event here
                    // This function will be executed when the trash icon is pressed
                    console.log("Trash icon pressed");
                    // Add your logic to delete the event or perform any necessary action
                  }}
                />
              </View>
            </View>
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
                  {id}
                </Text>
                <TouchableOpacity
                  style={styles.attendeesButton}
                  onPress={showParticipantsModal}
                >
                  <Text style={styles.attendeesButtonText}>
                    View Participants
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

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
          <View style={{ height: hp("59%"), marginBottom: hp("1%") }}>
            <ListView
              data={participants.split(", ")}
              renderItem={({ item }) => (
                <ProfileCard
                  name={item}
                  onParticipantSelect={handleParticipantSelect}
                />
              )}
            />
          </View>
          <View style={{ height: hp("5%") }}>
            <Button text={"Remove"} />
            {/* onPress={removeParticipant} put this to button if bug is fixed*/}
          </View>
        </View>
        {/* <Text style={styles.participantsModalTitle}>{participants}</Text> */}
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
  trashIconContainer: {
    position: "absolute",
    top: wp("6%"), // Adjust the top position as needed
    right: wp("6%"), // Adjust the right position as needed
  },
  trashIconBackground: {
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
