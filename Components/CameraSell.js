import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Share } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Overlay, Input, Button } from "react-native-elements";
import styled from "styled-components";
import { Auth } from "aws-amplify";
import Axios from "axios";
// import { cos, onChange } from "react-native-reanimated";

export default function CameraSell() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [visible, setVisible] = useState(false);
  const [Email, onChangeEmail] = React.useState("");
  const [value, onChangeText] = React.useState("");
  const [quantity, onChangeQuantuty] = React.useState("");
  const [Pid, onChangePid] = React.useState("");
  const [subimt, setSubmit] = React.useState(false);
  const [Cart, setCart] = React.useState([]);
  const [CART, setCART] = React.useState({});
  const [Price, onPriceChange] = React.useState({});
  const [Total, setTotal] = React.useState(0);
  const [Bill, setBill] = React.useState("");

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: "Your bill",
        message: Bill,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const setPrice = (name, p, q, Item) => {
    console.log(name, p, q, Item, "Set Price");
    const { Name, pid, price, quantity, id } = Item;
    const C = CART;
    C[id] = {
      Name,
      pid,
      id,
      price,
      quantity: q,
    };
    let bill = "*Your Bill For Purchase* \n";
    setCART(C);
    // CAlculating price
    let peice = 0;
    Object.keys(CART).map((i) => {
      peice = peice + parseInt(CART[i].price) * parseInt(CART[i].quantity);
      bill =
        bill +
        "*" +
        CART[i].name +
        "*" +
        "    " +
        CART[i].quantity +
        "    " +
        CART[i].price +
        "    " +
        `${parseInt(CART[i].price)} * ${parseInt(CART[i].quantity)} = ` +
        "₹" +
        parseInt(CART[i].price) * parseInt(CART[i].quantity) +
        "\n";
    });

    // //
    // // Object.keys(Price).map((i) => {
    // //   peice = peice + parseInt(Price[i].price) * parseInt(Price[i].quantity);
    // //   console.log("This is the calculated price", peice);
    // bill =
    //   bill +
    //   "*" +
    //   Price[i].name +
    //   "*" +
    //   "    " +
    //   Price[i].quantity +
    //   "    " +
    //   Price[i].price +
    //   "    " +
    //   `${parseInt(Price[i].price)} * ${parseInt(Price[i].quantity)} = ` +
    //   "₹" +
    //   parseInt(Price[i].price) * parseInt(Price[i].quantity) +
    //   "\n";
    // //   console.log(
    // //     parseInt(Price[i].price),
    // //     parseInt(Price[i].quantity),
    // //     " = ",
    // //     parseInt(Price[i].price) * parseInt(Price[i].quantity),
    // //     Price[i]
    // //   );
    // // });
    // // console.log(Price, peice);
    setTotal(peice);
    bill = bill + " \n \n \n \n \n Total =  ₹" + peice;
    setBill(bill);
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setVisible(true);
    const Payload = {
      pid: data,
      groupid: Auth.user.attributes.email,
    };
    Axios.post(
      "https://o49nuk5apc.execute-api.ap-south-1.amazonaws.com/dev/item/getsingle",
      Payload
    )
      .then(async (res) => {
        let d = Cart;
        const CA = CART;
        const { id, pid, context, Name } = res.data.data[0];
        CA[id] = {
          pid,
          id,
          ...context,
          quantity: 1,
          Name,
        };
        setCART(CA);
        setCart([...d, ...res.data.data]);
        console.log(res, Cart, CA, "This is the object");
      })
      .catch(async (err) => {
        await setSubmit(!subimt);
        alert("Facing some issues, come back later!");
      });
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
      <View
        style={{
          marginTop: "5%",
          backgroundColor: "blue",
          width: "20%",
          justifyContent: "flex-end",
          padding: "1%",
          alignSelf: "flex-end",
        }}
      >
        <Text style={{ color: "white" }}>Total : {Total}</Text>
      </View>

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
            onPress={() => setScanned(false)}
          />
        </View>
      )}
      {visible && (
        <View
          style={{
            width: "100%",
            height: "30%",
            backgroundColor: "#fff",
            position: "absolute",
            bottom: 0,
          }}
        >
          {Object.keys(CART).map((i, k) => {
            return <Item i={CART[i]} setPrice={setPrice} />;
          })}
          {/* {Cart.map((i, k) => {
            return <Item i={i} setPrice={setPrice} />;
          })} */}
          <Button onPress={onShare} title="Checkout" />
        </View>
      )}
    </View>
  );
}
const Lower = styled.View`
  padding: 1%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Item = ({ i, setPrice }) => {
  const [Quantity, onQuantityChange] = React.useState(1);
  useEffect(() => {
    console.log(i.price);
    setPrice(i.Name, i.price, Quantity, i);
  }, [Quantity]);
  return (
    <View style={{ borderBottomColor: "blue", borderBottomWidth: 1 }}>
      <View
        style={{
          padding: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>Name : {i.Name}</Text>
        <Text style={{ color: "green", fontWeight: "bold" }}>
          {" "}
          Price : ₹{i.price}
        </Text>
      </View>
      <View
        style={{ alignSelf: "center", display: "flex", flexDirection: "row" }}
      >
        <Text
          onPress={() => {
            if (Quantity > 1) {
              onQuantityChange(Quantity - 1);
            }
          }}
          style={{
            color: "red",
            // backgroundColor: "bule",
            padding: "1%",
            fontWeight: "bold",
          }}
        >
          -
        </Text>
        <Text
          style={{
            color: "blue",
            // backgroundColor: "bule",
            padding: "1%",
            fontWeight: "bold",
          }}
        >
          {" "}
          {Quantity}
        </Text>
        <Text
          onPress={() => {
            onQuantityChange(Quantity + 1);
          }}
          style={{
            color: "green",
            // backgroundColor: "bule",
            padding: "1%",
            fontWeight: "bold",
          }}
        >
          +
        </Text>
      </View>
    </View>
  );
};
