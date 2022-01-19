import React, { useState } from "react";
import { useEffects } from "react";
import { StyleSheet, Text, View, Keyboard } from "react-native";
import { TextInput, TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import firebase from "../database/firebaseDB";

const db = firebase.firestore();
const auth = firebase.auth();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const login = () => {
    Keyboard.dismiss();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ userCredential }) => {
        console.log("signed in!");
        navigation.navigate("Chat", { email });
      })
      .catch((error) => {
        console.log("ERROR");
        setErrorText(error.message);
      });
  };
  return (
    <View>
      <Text style={styles.title}>Chat App</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.textInput}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
        placeholder="Enter Email"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.textInput}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
        placeholder="Enter Pasword"
      />
      <TouchableOpacity
        style={styles.buttons}
        // onPress={() => {
        //   console.log(email, password);
        // }}
        onPress={login}
      >
        <View>
          <Text style={styles.buttonText}>Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    padding: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 24,
    width: "80%",
    marginLeft: 20,

  },
  textInput: {
    margin: 20,
	marginTop: 0, 
    borderWidth: 1,
    width: "90%",
    padding: 10,
    borderColor: "#ccc",
  },
  buttons: {
    flexDirection: "row",
    backgroundColor: "blue",
    width: "30%",
    margin: 20,
    borderRadius: 10,
  },
  button: {
    padding: 10,
    margin: 5,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    padding: 5,
    margin: 5,
    fontSize: 24,
  },
  submitButton: {
    backgroundColor: "orange",
  },
  cancelButton: {
    backgroundColor: "red",
  },
});

export default LoginScreen;
