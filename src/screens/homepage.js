import { Text, View, Button } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import Home from "../components/Home";

export default function Login({ navigation }) {
  console.log(navigation);
  return (
    <View style={globalStyles.container}>
      <Home navigation={navigation} />
    </View>
  );
}
