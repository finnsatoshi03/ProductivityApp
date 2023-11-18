import { Text, View } from "react-native";
import { globalStyles } from "./styles/globalStyles";

export default function AdminLogin() {
  return (
    <View style={globalStyles.container}>
      <Text>Admin Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}
