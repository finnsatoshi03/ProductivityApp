import { Text, View } from "react-native";
import { globalStyles } from "./../styles/globalStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Header from "./../components/header";

export default function Calendar() {
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Header title={"Chats"} subTitle={"Communities"} gap={true} />
      </View>
      <Text>Chats Screen</Text>
    </View>
  );
}
