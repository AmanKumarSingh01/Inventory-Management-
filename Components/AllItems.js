import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Card, Header, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Axios from "axios";
import { Auth } from "aws-amplify";
import { ScrollView } from "react-native-gesture-handler";
const AllItems = () => {
  const [Data, setData] = useState([]);
  const [Loaded, setLoaded] = useState(false);
  const [Loading, setLoading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    const Featch = async () => {
      const Payload = {
        groupid: Auth.user.attributes.email,
      };
      await Axios.post(
        "https://o49nuk5apc.execute-api.ap-south-1.amazonaws.com/dev/item/getitem",
        Payload
      )
        .then(async (res) => {
          let D = [...res.data.data];
          setData(D);
          setLoading(false);
          setLoaded(!Loaded);
        })
        .catch(async (err) => {
          await setSubmit(!subimt);
          alert("Facing some issues, come back later!");
        });
    };
    Featch();
  }, []);

  const refresh = async () => {
    setLoading(true);
    setData([]);
    const Payload = {
      groupid: Auth.user.attributes.email,
    };
    await Axios.post(
      "https://o49nuk5apc.execute-api.ap-south-1.amazonaws.com/dev/item/getitem",
      Payload
    )
      .then(async (res) => {
        setData([...res.data.data]);
        setLoaded(!Loaded);
        setLoading(false);
      })
      .catch(async (err) => {
        await setSubmit(!subimt);
        alert("Facing some issues, come back later!");
      });
  };

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
            style={{ transform: [{ scale: 2 }] }}
            onPress={refresh}
          />
        }
      />
      {Loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView>
          {Data.map((i, k) => {
            console.log(i, "ITEMS");
            return <Cardss data={i} />;
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default AllItems;

const Cardss = ({ data }) => {
  return (
    <Card>
      <Card.Title>{data.Name}</Card.Title>
      <Card.Divider />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Text>Quantity : {data.context.quantity}</Text>
        <Text>Price : {data.context.price}</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Text>Manf Date</Text>
        <Text>Exp Date</Text>
      </View>
    </Card>
  );
};
