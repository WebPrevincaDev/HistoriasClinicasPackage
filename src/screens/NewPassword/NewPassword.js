import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const NewPassword = () => {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  const navigation = useNavigation();

  const onSendPressed = () => {
    console.warn("Cambiando password");
    navigation.navigate('Home');
  };

  const onSignInPressed = () => {
    console.warn("Sign In");
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Recupera tú contraseña</Text>

        <CustomInput placeholder={"Código"} value={code} setValue={setCode} />
        <CustomInput placeholder={"Ingrese la nueva contraseña"} value={newPassword} setValue={setNewPassword} />

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

export default NewPassword;

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
