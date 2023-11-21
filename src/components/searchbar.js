import { Text, View, Image } from "react-native";
import { globalStyles } from "./../styles/globalStyles";

export default function Searchbar({ placeholder, bgColor, padding }) {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 15,
          backgroundColor: bgColor ? bgColor : globalStyles.colors.green200,
          paddingVertical: padding ? padding : 10,
          paddingHorizontal: padding ? padding : 20,
          borderRadius: 20,
        }}
      >
        <Image
          style={{ height: 20, width: 20 }}
          source={require("./../../assets/search.png")}
        />
        <Text style={{ fontFamily: globalStyles.fontStyle.regular }}>
          {placeholder || "Search"}
        </Text>
      </View>
    </View>
  );
}
