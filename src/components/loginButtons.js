import { Text, View, Pressable } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export default function LoginButons({ text }) {
  return (
    <View>
      <View style={{ flex: 1, backgroundColor: "#32620e", borderRadius: 20 }}>
        <Pressable style={{ paddingHorizontal: 30, paddingVertical: 10 }}>
          <Text
            style={{
              fontFamily: "montserrat-semiBold",
              color: "#fff",
              alignSelf: "center",
            }}
          >
            {text}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
