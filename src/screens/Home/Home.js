import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import CustomAutocomplete from "../../components/CustomAutocomplete";
import mobileOptions from "../../placeholder/mobiles.json";
import CustomButton from "../../components/CustomButton";
import {
  filterProfessionalsByGroup,
  saveAsyncStorage,
} from "../../helpers/data";

const ninguno = { label: "Ninguno", value: "Ninguno" };

const Home = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const [nurseOpen, setNurseOpen] = useState(false);
  const [nurseValue, setNurseValue] = useState(null);
  const [nurseItems, setNurseItems] = useState([]);

  const [driverOpen, setDriverOpen] = useState(false);
  const [driverValue, setDriverValue] = useState(null);
  const [driverItems, setDriverItems] = useState([]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileValue, setMobileValue] = useState(null);
  const [mobileItems, setMobileItems] = useState(mobileOptions);

  const onNurseOpen = useCallback(() => {
    setDriverOpen(false);
    setMobileOpen(false);
  }, []);

  const onDriverOpen = useCallback(() => {
    setNurseOpen(false);
    setMobileOpen(false);
  }, []);

  const onMobileOpen = useCallback(() => {
    setNurseOpen(false);
    setDriverOpen(false);
  }, []);

  const guardarConfiguracion = async () => {
    if (!nurseValue || !driverValue || !mobileValue) {
      Alert.alert("Complete todos los campos necesarios");
      return;
    }
    if (mobileValue.includes("1") || mobileValue.includes("2")) {
      if (nurseValue === ninguno.value) {
        Alert.alert("Los móviles 1 y 2 deben tener un enfermero asignado");
        return;
      }
    }
    // setData
    await saveAsyncStorage(mobileValue, "movil");
    await saveAsyncStorage(driverValue, "chofer");
    await saveAsyncStorage(nurseValue, "enfermero");
    await saveAsyncStorage(user.app_nombre, "medico");
    Alert.alert("Datos guardados con éxito");
    navigation.navigate("CrearHCD");
  };

  useEffect(() => {
    const cargar_datos = async () => {
      if (nurseItems.length && driverItems.length) return;
      setIsLoading(true);
      // getEnfermeros
      const enfermeros = await filterProfessionalsByGroup("ENF");
      const enfermerosFormated = enfermeros.map((enfermero) => ({
        label: enfermero.name,
        value: enfermero.name,
      }));
      setNurseItems([ninguno, ...enfermerosFormated]);
      // getChoferes
      const choferes = await filterProfessionalsByGroup("CHOF");
      const choferesFormated = choferes.map((chofer) => ({
        label: chofer.name,
        value: chofer.name,
      }));
      // Los choferes pueden ser enfermeros en algunos casos
      setDriverItems([...choferesFormated, ...enfermerosFormated]);
      setIsLoading(false);
    };
    cargar_datos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Datos</Text>
      <Text>Médico: {user.app_nombre}</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <CustomAutocomplete
            label="Móvil"
            open={mobileOpen}
            value={mobileValue}
            items={mobileItems}
            setOpen={setMobileOpen}
            setValue={setMobileValue}
            onOpen={onMobileOpen}
            zIndex={1000}
            zIndexInverse={3000}
          />
          <CustomAutocomplete
            label="Chofer"
            open={driverOpen}
            value={driverValue}
            items={driverItems}
            setOpen={setDriverOpen}
            setValue={setDriverValue}
            onOpen={onDriverOpen}
            zIndex={2000}
            zIndexInverse={2000}
            setItems={setDriverItems}
            addCustomItem={true}
          />
          <CustomAutocomplete
            label="Enfermero"
            open={nurseOpen}
            value={nurseValue}
            items={nurseItems}
            setOpen={setNurseOpen}
            setValue={setNurseValue}
            onOpen={onNurseOpen}
            zIndex={3000}
            zIndexInverse={1000}
            setItems={setNurseItems}
            addCustomItem={true}
          />

          <Text>Los móviles 1 y 2 deben tener un enfermero asignado</Text>

          <CustomButton text="GUARDAR" onPress={guardarConfiguracion} />
        </>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
