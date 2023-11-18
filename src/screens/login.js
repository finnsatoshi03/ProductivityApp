import { Text, View, Button } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import LoginComponent from "../components/loginComponent";

export default function Login({ navigation }) {
  return (
    <View style={globalStyles.container}>
      <LoginComponent navigation={navigation} />
    </View>
  );
}
