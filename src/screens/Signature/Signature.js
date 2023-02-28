import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import SignatureScreen from "react-native-signature-canvas";
import { useRef } from "react";
import { useState } from "react";

const Signature = ({ onOK }) => {
  const ref = useRef();
  const navigation = useNavigation();

  const [state, setState] = useState({
    signature: null,
    sin_datos: false,
    cargando: true,
    uri: "",
    key: "",
  });

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signature) => {
    console.log(signature);
    // onOK(signature); // Callback from Component props
    navigation.navigate("Home");

  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    Alert.alert(
      "No ha firmado, por favor firme en el area correspondiente para poder continuar"
    );
  };

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    console.log("clear success!");
  };

  // Called after end of stroke
  const handleEnd = () => {
    ref.current.readSignature();
  };

  // Called after ref.current.getData()
  const handleData = (data) => {
    console.log(data);
  };

  return (
    <SignatureScreen
      style={{
        flex: 1,
        marginTop: 50,
        backgroundColor: "red",
      }}
      ref={ref}
      onOK={handleOK}
      onEmpty={handleEmpty}
      onClear={handleClear}
      onGetData={handleData}
      autoClear={true}
      descriptionText={"Registrar Firma"}
      imageType={"image/png"}
      confirmText={"Guardar"}
      clearText="Limpiar"
    />
  );
};

export default Signature;

const styles = StyleSheet.create({});
