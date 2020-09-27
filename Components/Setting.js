import React from "react";
import { View, Text } from "react-native";
import { Header, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const Setting = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Header
        leftComponent={
          <Icon
            name="bars"
            type="font-awesome-5"
            color="#fff"
            onPress={() => navigation.openDrawer()}
          />
        }
        centerComponent={{
          text: "Item dashboard",
          style: { color: "#fff", transform: [{ scale: 1.5 }] },
        }}
        rightComponent={
          <Icon
            name="refresh"
            type="evilicon"
            color="#fff"
            // onPress={refresh}
          />
        }
      />
    </View>
  );
};

export default Setting;
