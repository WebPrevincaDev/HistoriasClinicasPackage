import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const { control, handleSubmit } = useForm();

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

        <CustomInput name={"email"} placeholder={"Email"} control={control} rules={{required: 'Ingrese su email por favor'}} />

        <CustomButton text={"Enviar"} onPress={handleSubmit(onSendPressed)} />

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
