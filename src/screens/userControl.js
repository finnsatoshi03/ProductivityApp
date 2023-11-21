import { Text, View } from "react-native";
import { globalStyles } from "./../styles/globalStyles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Header from "./../components/header";
import ListView from "./../components/listView";
import Participants from "./../components/profileCard";
import Navbar from "./../Layout/navbar";

export default function UserControl({ navigation }) {
  //sample data
  const data = [
    {
      name: "Jhon Doe",
      date: "Today, 1PM",
      showViewIcon: true,
    },
    {
      name: "Jane Smith",
      date: "Yesterday, 2PM",
      showViewIcon: true,
    },
    {
      name: "Bob Johnson",
      date: "Today, 3PM",
      showViewIcon: true,
    },
    {
      name: "Alice Williams",
      date: "Yesterday, 4PM",
      showViewIcon: true,
    },
    {
      name: "Charlie Brown",
      date: "Today, 5PM",
      showViewIcon: true,
    },
    {
      name: "David Jones",
      date: "Yesterday, 6PM",
      showViewIcon: true,
    },
    {
      name: "Emily Davis",
      date: "Today, 7PM",
      showViewIcon: true,
    },
    {
      name: "Frank Miller",
      date: "Yesterday, 8PM",
      showViewIcon: true,
    },
    {
      name: "Grace Wilson",
      date: "Today, 9PM",
      showViewIcon: true,
    },
    {
      name: "Harry Moore",
      date: "Yesterday, 10PM",
      showViewIcon: true,
    },
    {
      name: "Irene Taylor",
      date: "Today, 11PM",
      showViewIcon: true,
    },
  ];

  return (
    <View style={globalStyles.container}>
      <View>
        <View style={{ height: hp("8%") }}>
          <Header
            title={"Account"}
            subTitle={"Verification"}
            gap={true}
            marginBottom={true}
          />
        </View>
        <View style={{ height: hp("79%") }}>
          <ListView
            data={data}
            renderItem={({ item }) => <Participants {...item} />}
          />
        </View>
        <View style={{ height: hp("13%") }}>
          <Navbar
            notifCounts={2}
            icon="none"
            navigation={navigation}
            eventsData={data}
          />
        </View>
      </View>
    </View>
  );
}
