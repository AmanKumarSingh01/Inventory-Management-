import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Overlay, Input, Button } from "react-native-elements";
import styled from "styled-components";
import { Auth } from "aws-amplify";
import Axios from "axios";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [visible, setVisible] = useState(false);
  const [Email, onChangeEmail] = React.useState("");
  const [value, onChangeText] = React.useState("");
  const [quantity, onChangeQuantuty] = React.useState("");
  const [Pid, onChangePid] = React.useState("");
  const [subimt, setSubmit] = React.useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    onChangePid(data);
    setVisible(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const HandleSubmit = async () => {
    setSubmit(true);
    const Payload = {
      Name: Email,
      pid: Pid,
      groupid: Auth.user.attributes.email,
      context: {
        price: value,
        quantity: quantity,
      },
    };
    Axios.post(
      "https://o49nuk5apc.execute-api.ap-south-1.amazonaws.com/dev/item",
      Payload
    )
      .then(async (res) => {
        if (!res.data.error) {
          onChangeEmail("");
          onChangePid("");
          onChangeText("");
          onChangeQuantuty("");
          alert("Sucessfullly added!");
          await setVisible(false);
        } else {
          setSubmit(false);
          await alert(`Failed ${res.data.messege}`);
        }
      })
      .catch(async (err) => {
        await setSubmit(!subimt);
        alert("Facing some issues, come back later!");
      });
    console.log(Payload);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View
      style={{
        flex: 1,
        position: "relative",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          transform: [{ scale: 2 }],
        }}
      />

      {scanned && (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            title={"Tap to Scan Again"}
            onPress={() => {
              setScanned(false);
              setSubmit(false);
            }}
          />
        </View>
      )}
      <Overlay isVisible={visible} fullScreen>
        <Text
          style={{
            color: "green",
            fontWeight: "bold",
            transform: [{ scale: 1.5 }],
            textAlign: "center",
          }}
        >
          Item Scanned put itno the database
        </Text>
        <Input
          placeholder="Name"
          leftIcon={{ type: "font-awesome-5", name: "signature" }}
          onChangeText={(text) => onChangeEmail(text)}
          value={Email}
        />

        <Input
          placeholder="Price"
          leftIcon={{ type: "font-awesome-5", name: "rupee-sign" }}
          onChangeText={(text) => onChangeText(text)}
          value={value}
        />
        <Input
          placeholder="Quantity"
          leftIcon={{ type: "font-awesome-5", name: "cannabis" }}
          onChangeText={(text) => onChangeQuantuty(text)}
          value={quantity}
        />
        <Lower>
          <Button
            title="Cancle"
            type="solid"
            icon={{
              type: "font-awesome",
              name: "user-plus",
              size: 15,
              color: "white",
            }}
            onPress={() => {
              onChangeEmail("");
              onChangePid("");
              onChangeText("");
              onChangeQuantuty("");
              setSubmit(false);
              setVisible(false);
            }}
          />
          <Button
            title="Submit"
            type="solid"
            icon={{
              type: "font-awesome",
              name: "arrow-right",
              size: 15,
              color: "white",
            }}
            loading={subimt}
            onPress={HandleSubmit}
          />
        </Lower>
      </Overlay>
    </View>
  );
}
const Lower = styled.View`
  padding: 1%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
