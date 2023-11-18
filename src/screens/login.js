import { Text, View } from "react-native";
import { globalStyles } from "./styles/globalStyles";

export default function Login() {
  return (
    <View style={globalStyles.container}>
      <Text>Login Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}
