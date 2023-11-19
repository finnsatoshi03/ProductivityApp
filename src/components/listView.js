import React from "react";
import { View, FlatList } from "react-native";
import Profile from "./profileCard";

export default function listView() {
  const data = [
    {
      name: "Mark",
      date: "Date 1",
      time: "Time 1",
      event: "Event 1",
      location: "Location 1",
    },
    {
      date: "Date 2",
      time: "Time 2",
      event: "Event 2",
      location: "Location 2",
    },
    {
      date: "Date 3",
      time: "Time 3",
      event: "Event 3",
      location: "Location 3",
    },
    {
      date: "Date 4",
      time: "Time 4",
      event: "Event 4",
      location: "Location 4",
    },
    {
      date: "Date 5",
      time: "Time 5",
      event: "Event 5",
      location: "Location 5",
    },
    {
      date: "Date 6",
      time: "Time 6",
      event: "Event 6",
      location: "Location 6",
    },
    {
      date: "Date 7",
      time: "Time 7",
      event: "Event 7",
      location: "Location 7",
    },
    {
      date: "Date 8",
      time: "Time 8",
      event: "Event 8",
      location: "Location 8",
    },
    {
      date: "Date 9",
      time: "Time 9",
      event: "Event 9",
      location: "Location 9",
    },
    {
      date: "Date 10",
      time: "Time 10",
      event: "Event 10",
      location: "Location 10",
    },
  ]; // replace with your actual data

  const ItemSeparator = () => <View style={{ height: 7 }} />;

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => <Profile {...item} />}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
}
