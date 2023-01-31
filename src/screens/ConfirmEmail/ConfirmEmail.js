import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

const ConfirmEmail = () => {
  const [code, setCode] = useState("");

  const onConfirmPressed = () => {
    console.warn("Confirm Code");
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
        <Text style={styles.title}>Confirmar el Email</Text>

        <CustomInput placeholder={"Código"} value={code} setValue={setCode} />

        <CustomButton text={"Confirmar"} onPress={onConfirmPressed} />

        <CustomButton
          text={"Reenviar el Código"}
          onPress={onResendPressed}
          type="SECONDARY"
        />
        <CustomButton
          text={"Volver a Inicio"}
          onPress={onSignInPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default ConfirmEmail;

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
