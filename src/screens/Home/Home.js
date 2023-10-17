import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import CustomAutocomplete from "../../components/CustomAutocomplete";
import { useState } from "react";

const Home = () => {
  const navigation = useNavigation();
  const [nurse, setNurse] = useState("");

  return (
    <View>
      <Text>DATOS</Text>
      <CustomAutocomplete
        value={nurse}
        setValue={setNurse}
        options={[
          { label: "Enfemero 1", value: "nurse1" },
          { label: "Enfemero 2", value: "nurse2" },
        ]}
      />
    </View>
  );
};
//GUARDAR LAS OPTIONS EN UNA CARPETA PLACEHOLDER CON ARCHIVOS .JSON PARA NO TENER QUE CREAR UN BACKEND
export default Home;

const styles = StyleSheet.create({});
