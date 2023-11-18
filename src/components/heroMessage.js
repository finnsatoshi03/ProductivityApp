import React from "react";
import { Text, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export default function HeroMessage({ header, description }) {
  const headerParts = header.split(" ");

  return (
    <View style={globalStyles.welcomeContainer}>
      {headerParts.length === 1 && (
        <Text style={globalStyles.welcomeHeader}>{headerParts[0]}</Text>
      )}
      {headerParts.length > 1 && (
        <>
          <Text style={globalStyles.welcomeHeader}>{headerParts[0]}</Text>
          <Text style={globalStyles.welcomeHeaderBold}>
            {headerParts.slice(1).join(" ")}
          </Text>
        </>
      )}
      <Text style={globalStyles.welcomeDescription}>{description}</Text>
    </View>
  );
}
