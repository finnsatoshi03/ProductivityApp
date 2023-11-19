import React from "react";
import { View, FlatList } from "react-native";

export default function listView({ data, renderItem }) {
  const ItemSeparator = () => <View style={{ height: 7 }} />;

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
}

// Call this component like this:
{
  /* <ListView
data={data}
renderItem={({ item }) => <EventCard {...item} />}
/> */
}
