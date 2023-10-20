import {
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
  TextInput,
  Alert,
  Button,
} from "react-native";
import React, { useState } from "react";
import PlaceHolderLogo from "../../../assets/images/testLogo.jpg";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginWithFirebase } from "../../store/slices/auth/thunks";

const SignIn = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { control, handleSubmit, formState: {errors} } = useForm();

  const onSignInPressed = async (data) => {
    const response = await dispatch(loginWithFirebase(data));
    authFirebaseUser(response);
  };

  const onForgotPasswordPressed = () => {
    console.warn("Forgot Password");

    navigation.navigate("ForgotPassword");
  };

  const authFirebaseUser = ({type}) => {
    if (type === "auth/loginWithFirebase/rejected"){
      return Alert.alert('Credenciales Incorrectas')
    }
    navigation.navigate("HomeTab");
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
          onPress={handleSubmit(onSignInPressed)}
        />
      <Button onPress={()=>navigation.navigate('Signature')} title="IR A SIGNATURE"/>

        <CustomButton
          text={"Olvidé mi Contraseña"}
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

      </View>
    </ScrollView>
  );
};

export default SignIn;

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
