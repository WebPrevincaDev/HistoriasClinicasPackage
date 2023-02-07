import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

const NewPassword = () => {
  const { control, handleSubmit } = useForm();

  const navigation = useNavigation();

  const onSendPressed = () => {
    console.warn("Cambiando password");
    navigation.navigate("Home");
  };

  const onSignInPressed = () => {
    console.warn("Sign In");
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Recupera tú contraseña</Text>

        <CustomInput
          name={"code"}
          placeholder={"Código"}
          control={control}
          rules={{ required: "Ingrese el código por favor" }}
        />
        <CustomInput
          name={"newPassword"}
          placeholder={"Ingrese la nueva contraseña"}
          control={control}
          secureTextEntry
          rules={{
            required: "Ingrese una contraseña",
            minLength: {
              value: 8,
              message: "La contraseña debe contener 8 o más caracteres",
            },
          }}
        />

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
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
});
