import React, { useRef } from "react";
import { View, FlatList } from "react-native";

export default function listView({ data, renderItem, scrollToEnd }) {
  const flatListRef = useRef();
  const ItemSeparator = () => <View style={{ height: 7 }} />;

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparator}
        onContentSizeChange={() =>
          scrollToEnd && flatListRef.current.scrollToEnd()
        }
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
