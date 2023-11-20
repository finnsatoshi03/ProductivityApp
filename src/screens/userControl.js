import { Text, View } from "react-native";
import { globalStyles } from "./../styles/globalStyles";
import Header from "./../components/header";
import ListView from "./../components/listView";

export default function Calendar() {
  return (
    <View>
      <Header title={"Account"} subTitle={"Verification"} />
      <Text>UserControl Screen</Text>
    </View>
  );
}
