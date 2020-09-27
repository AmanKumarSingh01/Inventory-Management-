import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import styled from "styled-components";
import { Image, Text, TextInput, View, StyleSheet } from "react-native";
import logo from "./../assets/Logo.png";
import { Input, Button } from "react-native-elements";
import { Auth } from "aws-amplify";

const Login = ({ auth, event }) => {
  const [Email, onChangeEmail] = React.useState("");
  const [value, onChangeText] = React.useState("");
  const [logib, setlogin] = React.useState(false);
  const [Error, setError] = React.useState("");
  const [Caught, setCaught] = React.useState(false);

  const LogMeIn = async () => {
    setlogin(true);
    if (Email != "" && value != "") {
      await Auth.signIn(Email.trim(), value)
        .then((res) => {
          auth(true);
        })
        .catch((e) => {
          console.log(e);
          setError(e);
          setCaught(true);
          setlogin(false);
        });
    } else {
      alert("Else");
      setlogin(false);
      setError("Attributes cannot be empty");
      setCaught(true);
    }
  };
  return (
    <View>
      {console.log(event, "aman rocks ")}
      <Header>
        <Text style={styles.textHeader}>Login</Text>
      </Header>
      <Footer>
        <Image style={styles.image} source={logo} />
        {Caught ? (
          <Text style={{ color: "red" }}>*{Error?.message}</Text>
        ) : (
          <Text></Text>
        )}
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
            onPress={() => event.navigation.navigate("Signup")}
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
            loading={logib}
            onPress={LogMeIn}
          />
        </Lower>
      </Footer>
    </View>
  );
};

export default Login;

const Lower = styled.View`
  padding: 1%;
  display: flex;
  flex-direction: row;
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
