import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { checkIfEmailExistsInFirebase, createNewFirebaseUser } from "../../store/slices/auth/thunks";

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const SignUp = () => {
  const { control, handleSubmit, watch } = useForm();
  const dispatch = useDispatch();
  const pwd = watch('password');
  const navigation = useNavigation();

  const onRegisterPressed = async (data) => {
    console.warn("Sign in");
    //DEBERIA MOSTRAR EL OBJETO CON LOS DATOS DE LOS INPUTS
    const response = await dispatch(createNewFirebaseUser(data));
    if(response.payload.code && response.payload.code.includes('auth/email-already-in-use')){
      return Alert.alert('YA EXISTE UN USUARIO CON ESE EMAIL');
    }

    navigation.navigate("ConfirmEmail");
  };

  const onSignInPressed = () => {
    console.warn("Sign In");
    navigation.navigate("SignIn");
  };

  const onTermsOfUsePressed = () => {
    console.warn("TERMS OF USE");
  };

  const onPrivacyPolicyPressed = () => {
    console.warn("Privacy Policy");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Crea una cuenta</Text>

        <CustomInput
          placeholder={"Email"}
          name={"email"}
          control={control}
          rules={{
            require: "Se requiere el email",
            pattern: { value: EMAIL_REGEX, message: "Email inválido" },
          }}
        />
        <CustomInput
          name={"password"}
          control={control}
          placeholder={"Contraseña"}
          secureTextEntry
          rules={{
            required: 'Ingrese una contraseña',
            minLength: {
              value: 8,
              message: 'La contraseña debe contener 8 o más caracteres'
            },
          }}
        />
        <CustomInput
          name={"password-repeat"}
          control={control}
          placeholder={"Repita la contraseña"}
          secureTextEntry
          rules={{
            validate: value => value === pwd || 'Las contraseñas no coinciden'
          }}
        />
        <CustomButton
          text={"Registrarme"}
          onPress={handleSubmit(onRegisterPressed)}
        />

        <Text style={styles.text}>
          Para registrarte, debes confirmar que aceptas nuestros{" "}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Términos de Uso
          </Text>{" "}
          y nuestra{" "}
          <Text style={styles.link} onPress={onPrivacyPolicyPressed}>
            Política de Privacidad
          </Text>
        </Text>

        <CustomButton
          text={"Ya tienes una cuenta? Ingresa"}
          onPress={onSignInPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default SignUp;

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
