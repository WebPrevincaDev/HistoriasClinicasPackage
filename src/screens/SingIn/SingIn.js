import {
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import PlaceHolderLogo from "../../../assets/images/testLogo.jpg";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

const SingIn = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const { control, handleSubmit, formState: {errors} } = useForm();

  const onSingInPressed = () => {
    console.warn("Sign in");
    //validate user
    navigation.navigate("Home");
  };

  const onForgotPasswordPressed = () => {
    console.warn("Forgot Password");

    navigation.navigate("ForgotPassword");
  };

  const onSignUpPressed = () => {
    console.warn("Sign up");
    navigation.navigate("SignUp");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={PlaceHolderLogo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <CustomInput
          name={'email'}
          placeholder={"Email"}
          control={control}
          rules={{required: 'Se requiere el email'}}
        />

        <CustomInput
          name={'password'}
          placeholder={"Contraseña"}
          control={control}
          secureTextEntry
          rules={{required: 'Se requiere la contraseña', minLength: {
            value: 5,
            message: 'La contraseña debe contener más de 5 caracteres'
          }}}
        />

        <CustomButton
          text={"Ingresar"}
          onPress={handleSubmit(onSingInPressed)}
        />
        <CustomButton
          text={"Olvidé mi Contraseña"}
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <CustomButton
          text={"No tienes una cuenta? Crea una"}
          onPress={onSignUpPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default SingIn;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
});
