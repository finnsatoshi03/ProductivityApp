import { Text, View } from "react-native";
import { globalStyles } from "./styles/globalStyles";

export default function Calendar() {
  return (
    <View style={globalStyles.container}>
      <Text>Calendar Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}
