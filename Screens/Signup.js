import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import styled from "styled-components";
import {
  Image,
  Text,
  TextInput,
  View,
  StyleSheet,
  StatusBar,
} from "react-native";
import logo from "./../assets/Logo.png";
import { Input, Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
const Signup = ({ navigation }) => {
  const [Email, onChangeEmail] = React.useState("");
  const [value, onChangeText] = React.useState("");

  return (
    <View>
      <Header>
        <Text style={styles.textHeader}>Sign-up</Text>
      </Header>
      <Footer>
        <ScrollView>
          <Image style={styles.image} source={logo} />
          <Input
            placeholder="Email"
            leftIcon={{ type: "font-awesome", name: "at" }}
            onChangeText={(text) => onChangeEmail(text)}
            value={Email}
            autoCompleteType="email"
          />

          <Input
            placeholder="Password"
            leftIcon={{ type: "font-awesome", name: "unlock" }}
            onChangeText={(text) => onChangeText(text)}
            value={value}
            secureTextEntry
          />

          <Input
            placeholder="Retype Password"
            leftIcon={{ type: "font-awesome", name: "unlock" }}
            onChangeText={(text) => onChangeText(text)}
            value={value}
            secureTextEntry
          />

          <Lower>
            <Button
              title="Signup"
              type="solid"
              icon={{
                type: "font-awesome",
                name: "user-plus",
                size: 15,
                color: "white",
              }}
            />
            <Button
              title="Login"
              type="solid"
              icon={{
                type: "font-awesome",
                name: "arrow-right",
                size: 15,
                color: "white",
              }}
              onPress={() => navigation.navigate("Login")}
            />
          </Lower>
          <Text style={{ padding: "1%", color: "grey" }}>
            By Signing up you are agreeing to all the terms and conditions.
          </Text>
        </ScrollView>
      </Footer>
    </View>
  );
};

export default Signup;

const Lower = styled.View`
  padding: 1%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
`;

const Header = styled.View`
  height: ${hp("10%")};
  width: ${wp("100%")};
  background-color: #275e77;
  text-align: center;
  color: #f7fafc;
`;
const Footer = styled.View`
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
  background-color: white;
  margin-top: -10%;
  height: ${hp("100%")};
`;

const styles = StyleSheet.create({
  textHeader: {
    color: "#f7fafc",
    textAlign: "center",
    fontWeight: "bold",
  },
  image: {
    alignSelf: "center",
  },
  TextInput: {
    height: 40,
    padding: 5,
  },
});
