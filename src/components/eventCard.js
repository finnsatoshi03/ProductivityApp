import { View, Text, Pressable, Image } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Define common styles
const commonStyles = {
  container: {
    margin: 0,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  text: {
    fontSize: globalStyles.fontSize.description,
  },
  image: {
    height: hp("2%"),
    width: hp("2%"),
  },
};

export default function eventCard({ date, time, event, location }) {
  return (
    <View
      style={{
        backgroundColor: globalStyles.colors.darkGreen,
        borderRadius: 20,
      }}
    >
      <View
        style={{
          ...commonStyles.container,
          backgroundColor: globalStyles.colors.green,
          gap: 5,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <Text style={{ ...commonStyles.text, color: "#fff", opacity: 0.5 }}>
          Schedule Event
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image
            style={commonStyles.image}
            source={require("../../assets/clock.png")}
          />
          <Text
            style={{
              fontSize: globalStyles.fontSize.mediumDescription,
              color: "#fff",
            }}
          >
            {date}, {time}
          </Text>
        </View>
      </View>
      <View
        style={{
          ...commonStyles.container,
          backgroundColor: "white",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontSize: globalStyles.fontSize.largeDescription }}>
              {event}
            </Text>
            <Text style={commonStyles.text}>{location}</Text>
          </View>
          <Image
            style={{ height: hp("4%"), width: hp("4%") }}
            source={require("../../assets/edit.png")}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 30,
            paddingVertical: 10,
          }}
        >
          <Pressable
            style={{
              backgroundColor: globalStyles.colors.green,
              width: "60%",
              alignItems: "center",
              paddingVertical: 10,
              borderRadius: 20,
            }}
          >
            <Text>VIEW</Text>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: "#e2e6f0",
              width: "30%",
              alignItems: "center",
              paddingVertical: 10,
              borderRadius: 20,
            }}
          >
            <Text>DELETE</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
