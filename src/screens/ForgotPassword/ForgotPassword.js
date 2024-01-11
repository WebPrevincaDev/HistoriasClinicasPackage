import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import Title from "../../components/Title";
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
        <Title>Recupera tu contraseña</Title>

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
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});
