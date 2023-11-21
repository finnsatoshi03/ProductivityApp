import React from "react";
import { TextInput, View, Image, Pressable } from "react-native";
import { globalStyles } from "./../styles/globalStyles";

export default function Searchbar({ placeholder, bgColor, padding }) {
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
            style={{ height: 20, width: 20 }}
            source={require("./../../assets/search.png")}
          />
        </Pressable>
        <TextInput
          ref={inputRef}
          style={{ fontFamily: globalStyles.fontStyle.regular }}
          placeholder={placeholder || "Search"}
          width={"100%"}
        />
      </View>
    </View>
  );
}
