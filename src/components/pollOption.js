import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function pollOption({ option }) {
  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          backgroundColor: globalStyles.colors.green,
          width: "100%",
          borderRadius: 20,
          paddingHorizontal: 20,
          paddingVertical: 5,
          margin: 4,
        }}
      >
        <Text
          style={{
            fontSize: globalStyles.fontSize.description,
            fontFamily: globalStyles.fontStyle.regular,
            color: "white",
          }}
        >
          {option.text}
        </Text>
      </View>
    </View>
  );
}
