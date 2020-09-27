import React, { useEffect } from "react";
import Amplify, { Auth } from "aws-amplify";
import config from "./aws-exports";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Screens/Home";
import { ActivityIndicator, StatusBar, View } from "react-native";
Amplify.configure(config);

const Stack = createStackNavigator();

function App() {
  const [loading, setloading] = React.useState(true);
  const [Authed, setAuthed] = React.useState(false);
  useEffect(() => {
    const Check = async () => {
      await Auth.currentAuthenticatedUser()
        .then(() => {
          console.log("Done");
          setAuthed(true);
          setloading(false);
        })
        .catch(() => {
          console.log("Error");
          setAuthed(false);
          setloading(false);
        });
    };
    Check();
  }, []);
  return (
    <>
      <StatusBar />
      {loading ? (
        <View
          style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              {Authed === true ? (
                <>
                  <Stack.Screen
                    name="Home"
                    component={() => <Home auth={setAuthed} />}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen
                    name="Login"
                    component={(e) => <Login auth={setAuthed} event={e} />}
                  />
                  <Stack.Screen name="Signup" component={Signup} />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </>
      )}
    </>
  );
}

export default App;
