import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");

  const navigation = useNavigation();
  
  const onSendPressed = () => {
    console.warn("Send...");
    navigation.navigate('NewPassword');
  };

  const onSignInPressed = () => {
    console.warn("Sign In");
    navigation.navigate('SignIn');
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

export default ForgotPassword;
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
