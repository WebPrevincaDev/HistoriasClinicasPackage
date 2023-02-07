import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

const ConfirmEmail = () => {
  const { control, handleSubmit } = useForm();

  const navigation = useNavigation();

  const onConfirmPressed = () => {
    console.warn("Confirm Code");
    navigation.navigate("Home");
  };

  const onSignInPressed = () => {
    console.warn("Sign In");
    navigation.navigate("SignIn");
  };

  const onResendPressed = () => {
    console.warn("reenviando codigo");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirmar Email</Text>

        <CustomInput
          name={"code"}
          placeholder={"Código"}
          control={control}
          rules={{ required: "Ingrese el código por favor" }}
        />

        <CustomButton
          text={"Confirmar"}
          onPress={handleSubmit(onConfirmPressed)}
        />

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
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
});
