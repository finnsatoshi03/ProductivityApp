import React, { useState } from "react";
import { Text, View, Image, Pressable } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Button from "./button";

export default function NotificationCard({
  notification_id,
  fullname,
  message,
  created_at,
  eventDate,
  eventLocation,
  eventTime,
  eventTitle,
  invitation,
  reason,
  read,
  adminNotif,
  onPressAccept,
  onPressReject,
  onPressTrash,
}) {
  const dateObject = new Date(created_at);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(dateObject);
  
  const eventTitles = [
    "Get ready for an electrifying event!",
    "Don't miss this exciting event!",
    "Join us for a memorable event!",
    "You're invited to a spectacular event!",
    "Mark your calendar for this amazing event!",
  ];

  const [header] = useState(
    eventTitles[Math.floor(Math.random() * eventTitles.length)]
  );
  console.log(invitation);
  return (
    <View
      style={{
        backgroundColor: "transparent",
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderBottomColor: globalStyles.colors.darkGreen,
        borderBottomWidth: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginBottom: 3,
            flexWrap: "wrap",
            width:
              eventDate && eventLocation 
                ? wp("55%")
                : "100%",
          }}
        >
          {eventDate && eventLocation ? (
            read === false ? (
              <>
                <View style={{ marginBottom: 5 }}>
                  <Text
                    style={{
                      fontFamily: globalStyles.fontStyle.bold,
                      fontSize: globalStyles.fontSize.mediumDescription,
                    }}
                  >
                    🎉 {header} 🎉
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: globalStyles.fontStyle.bold,
                    fontSize: globalStyles.fontSize.description,
                    flexShrink: 1,
                  }}
                >
                  <Text style={{ fontFamily: globalStyles.fontStyle.regular }}>
                    You're invited to the
                  </Text>{" "}
                  {eventTitle || "Event Title"}{" "}
                  <Text style={{ fontFamily: globalStyles.fontStyle.regular }}>
                    event on{" "}
                  </Text>
                  {eventDate || "Month Day, Year"}
                  <Text style={{ fontFamily: globalStyles.fontStyle.regular }}>
                    , at{" "}
                  </Text>
                  {eventLocation || "Location"}
                  
                </Text>
              </>
            ) : (
              <>
                <View style={{ marginBottom: 5 }}>
                  <Text
                    style={{
                      fontFamily: globalStyles.fontStyle.bold,
                      fontSize: globalStyles.fontSize.mediumDescription,
                    }}
                  >
                    🎉 {message} 🎉
                  </Text>
                </View>
              </>
            )
            
          ) : adminNotif ? (
            <>
              <Text
                style={{
                  fontFamily: globalStyles.fontStyle.bold,
                  fontSize: globalStyles.fontSize.mediumDescription,
                  flexShrink: 1,
                  marginBottom: 5,
                }}
              >
                {invitation === true ? (
                  <>
                    {fullname} is excited to{" "}
                    <Text style={{ color: globalStyles.colors.green }}>
                      accept
                    </Text>{" "}
                    your invitation for {eventTitle} on {formattedDate} at {eventLocation}! 🎉
                  </>
                ) : (
                  <>
                    <Text style={{ color: "#df5f4b" }}>Unfortunately</Text>,{" "}
                    {fullname} won't be able to make it to {eventTitle} this time.
                  </>
                )}
              </Text>
              {invitation !== true && (
                <Text
                  style={{
                    fontFamily: globalStyles.fontStyle.regular,
                    fontSize: globalStyles.fontSize.description,
                  }}
                >
                  {fullname + ": " + reason}
                </Text>
              )}
            </>
          ) : (
            <Text
              style={{
                fontFamily: globalStyles.fontStyle.bold,
                fontSize: globalStyles.fontSize.mediumDescription,
                flexShrink: 1,
              }}
            >
              {message}
            </Text>
          )}
        </View>
        {eventDate && eventLocation && !read ? (
          <View style={{ gap: 10, padding: 5 }}>
            <Button
              text={"Accept"}
              width={wp("20%")}
              borderRadius={10}
              onPress={onPressAccept}
            />
            <Button
              text={"Reject"}
              width={wp("20%")}
              borderRadius={10}
              bgColor="rgba(255, 255, 255, 0.5)"
              textColor="rgba(0, 0, 0, 0.5)"
              onPress={onPressReject}
            />
          </View>
        ) : ( <></> )}
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontFamily: globalStyles.fontStyle.regular }}>
          {formattedDate}
        </Text>
        {(eventDate && eventLocation && eventTime && eventTitle) ||
        adminNotif ? (
          <Pressable onPress={onPressTrash}>
            <Image
              style={{ height: wp("5%"), width: wp("5%") }}
              source={require("./../../assets/trash.png")}
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
