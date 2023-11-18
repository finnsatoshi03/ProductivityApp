import { Text, View, Image, TextInput } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import Background from "../../components/background";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LoginButton from "../../components/loginButton";
import HeroMessage from "../../components/heroMessage";

export default function AdminLogin({ navigation }) {
  return (
    <View
      style={[
        globalStyles.container,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Background topProperty={hp("5%")} />
      <Image
        style={globalStyles.adminLogo}
        source={require("../../../assets/logo.png")}
      />
      <HeroMessage
        header="Welcome Admin"
        description="Take control of efficiency with ProductivityApp. Your dashboard for seamless management awaits. Let's elevate productivity together!"
      />
      <View style={{ padding: 10, zIndex: 3, width: wp("80%") }}>
        <TextInput style={globalStyles.input} placeholder="Username" />
        <TextInput
          style={globalStyles.input}
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <View style={globalStyles.loginButtonContainer}>
        <LoginButton
          navigation={navigation}
          destination="Admin Login"
          text="Login"
        />
      </View>
    </View>
  );
}
