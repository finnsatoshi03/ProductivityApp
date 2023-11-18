import { Text, View, Button } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import Home from "../components/Home";
import defaultIconGenerator from "../components/defaultIconGenerator";

export default function Login({ navigation }) {
  return (
    <View style={globalStyles.container}>
      {defaultIconGenerator('John')}
      <Home navigation={navigation} />
    </View>
  );
}
