import React from "react";
import { TextInput, View, Image, Pressable } from "react-native";
import { globalStyles } from "./../styles/globalStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function Searchbar({
  placeholder,
  bgColor,
  padding,
  onChangeText,
}) {
  const inputRef = React.useRef();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 15,
          backgroundColor: bgColor ? bgColor : globalStyles.colors.green200,
          paddingVertical: padding ? 10 : undefined,
          paddingHorizontal: padding ? 20 : undefined,
          borderRadius: 20,
        }}
      >
        <Pressable onPress={() => inputRef.current.focus()}>
          <Image
            style={{ height: hp("2%"), width: hp("2%") }}
            source={require("./../../assets/search.png")}
          />
        </Pressable>
        <TextInput
          ref={inputRef}
          style={{ fontFamily: globalStyles.fontStyle.regular }}
          placeholder={placeholder || "Search"}
          width={"100%"}
          onChangeText={onChangeText} // Add this line
        />
      </View>
    </View>
  );
}
