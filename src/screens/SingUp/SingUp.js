import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

const SingUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const onRegisterPressed = () => {
    console.warn("Sign in");
  };

  const onSignInPressed = () => {
    console.warn("Sign In");
  };

  const onTermsOfUsePressed = () => {
    console.warn('TERMS OF USE')
  };

  const onPrivacyPolicyPressed = () => {
    console.warn('Privacy Policy')
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Crea una cuenta</Text>

        <CustomInput placeholder={"Email"} value={email} setValue={setEmail} />
        <CustomInput
          placeholder={"Contraseña"}
          value={password}
          setValue={setPassword}
          secureTextEntry
        />
        <CustomInput
          placeholder={"Repita la contraseña"}
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          secureTextEntry
        />
        <CustomButton text={"Registrarme"} onPress={onRegisterPressed} />

        <Text style={styles.text}>
          Para registrarte, debes confirmar que aceptas nuestros{' '}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>Términos de Uso</Text>
          {' '}y{' '}
          nuestra{' '}
          <Text style={styles.link} onPress={onPrivacyPolicyPressed}>Política de Privacidad</Text>
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

export default SingUp;
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
