import {
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import PlaceHolderLogo from "../../../assets/images/testLogo.jpg";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

const SingIn = () => {
  const { height } = useWindowDimensions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSingInPressed = () => {
    console.warn("Sign in");
  };

  const onForgotPasswordPressed = () => {
    console.warn("Forgot Password");
  };

  const onSignUpPressed = () => {
    console.warn("Sign up");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={PlaceHolderLogo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
        <CustomInput placeholder={"Email"} value={email} setValue={setEmail} />
        <CustomInput
          placeholder={"Contraseña"}
          value={password}
          setValue={setPassword}
          secureTextEntry
        />
        <CustomButton text={"Ingresar"} onPress={onSingInPressed} />
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
