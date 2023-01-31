import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

const ForgotPasswordScreen = () => {
  const [username, setUsername] = useState("");

  const onSendPressed = () => {
    console.warn("Send...");
  };

  const onSignInPressed = () => {
    console.warn("Sign In");
  };

  const onResendPressed = () => {
    console.warn('TERMS OF USE')
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Recupera tú contraseña</Text>

        <CustomInput placeholder={"Usuario"} value={username} setValue={setUsername} />

        <CustomButton text={"Enviar"} onPress={onSendPressed} />

        <CustomButton
          text={"Volver a Inicio"}
          onPress={onSignInPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;
//https://www.youtube.com/watch?v=_Fi86az2OV4 14:29
const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});
