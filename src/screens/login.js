import { Text, View, Button } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export default function Login({ navigation }) {
  return (
    <View style={globalStyles.container}>
      <Text>Login Screen</Text>
      <Button
        title="Navigate"
        onPress={() => navigation.navigate("Admin Login")}
      />
    </View>
  );
}
