import { Text, View } from "react-native";
import { globalStyles } from "./styles/globalStyles";

export default function Calendar() {
  return (
    <View style={globalStyles.container}>
      <Text>Events Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}
