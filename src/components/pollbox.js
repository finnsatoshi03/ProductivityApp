import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import PollOption from "./pollOption";

function hexToRGBA(hex, alpha) {
  let r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } else {
    return `rgb(${r}, ${g}, ${b})`;
  }
}

let colorWithOpacity = hexToRGBA(globalStyles.colors.green200, 0.3);

export default function pollbox({ headerTitle, options = [] }) {
  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          backgroundColor: colorWithOpacity,
          width: wp("70%"),
          paddingVertical: 15,
          paddingHorizontal: 20,
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            fontSize: globalStyles.fontSize.mediumDescription,
            fontFamily: globalStyles.fontStyle.semiBold,
            marginBottom: 6,
          }}
        >
          {headerTitle}
        </Text>
        {options.map((option, index) => (
          <PollOption key={index} option={option} />
        ))}
      </View>
    </View>
  );
}
