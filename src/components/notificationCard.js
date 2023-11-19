import { Text, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export default function notificationCard({ name, description, date, time }) {
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
      <View style={{ flexDirection: "row", marginBottom: 3, flexWrap: "wrap" }}>
        <Text
          style={{
            fontFamily: globalStyles.fontStyle.bold,
            fontSize: globalStyles.fontSize.mediumDescription,
            flexShrink: 1,
          }}
        >
          {`${name} `}
        </Text>
        <Text
          style={{
            fontFamily: globalStyles.fontStyle.regular,
            fontSize: globalStyles.fontSize.mediumDescription,
            flexShrink: 1,
          }}
        >
          {description}
        </Text>
      </View>

      <Text style={{ fontFamily: globalStyles.fontStyle.regular }}>
        {date}, {time}
      </Text>
    </View>
  );
}
