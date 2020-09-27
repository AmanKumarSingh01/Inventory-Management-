import { Auth } from "aws-amplify";
import React from "react";
import { View, Text, Image, Button } from "react-native";
import { Icon } from "react-native-elements";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Swiper from "react-native-swiper";
import Camera from "./../Components/Camera";
import AllItems from "../Components/AllItems";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Setting from "../Components/Setting";
import CameraSell from "../Components/CameraSell";
import Logo from "./../assets/Logo.png";
const Tab = createDrawerNavigator();

function HomeScreen() {
  return <AllItems />;
}

const Home = ({ auth }) => {
  const LogMeOut = async () => {
    Auth.signOut().then((e) => auth(false));
  };
  return (
    <Tab.Navigator
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <Image
            source={Logo}
            style={{
              alignSelf: "center",
            }}
          />
          <DrawerItemList {...props} />
          <Button title="Signout" onPress={LogMeOut} />
        </DrawerContentScrollView>
      )}
    >
      <Tab.Screen
        name="Home"
        options={{
          drawerLabel: "Inventory",
          drawerIcon: ({ color }) => (
            <Icon name="home" type="font-awesome" color="#f50" />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Add Item"
        options={{
          drawerLabel: "Add  Item",
          drawerIcon: ({ color }) => (
            <Icon name="home" type="font-awesome" color="#f50" />
          ),
        }}
        component={Camera}
      />
      <Tab.Screen
        name="Settings"
        options={{
          drawerLabel: "Sell Item",
          drawerIcon: ({ color }) => (
            <Icon name="cogs" type="font-awesome" color="#f50" />
          ),
        }}
        component={Setting}
      />
      <Tab.Screen
        name="Sell"
        options={{
          drawerLabel: "Sell",
          drawerIcon: ({ color }) => (
            <Icon name="cogs" type="font-awesome" color="#f50" />
          ),
        }}
        component={CameraSell}
      />
    </Tab.Navigator>
  );
};

export default Home;
