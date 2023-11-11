import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import CustomAutocomplete from "../../components/CustomAutocomplete";
import mobileOptions from "../../placeholder/mobiles.json";
import CustomButton from "../../components/CustomButton";
import { filterProfessionalsByGroup } from "../../helpers/data";
import { setHcdConfig } from "../../store/slices/hcd/thunks";
import { getFormattedArray } from "../../helpers/CustomAutocomplete";

const ninguno = { label: "Ninguno", value: "Ninguno" };

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const { hcdConfig } = useSelector((state) => state.hcd);

  const [isLoading, setIsLoading] = useState(false);

  const [nurseValue, setNurseValue] = useState(null);
  const [nurseItems, setNurseItems] = useState([]);

  const [driverValue, setDriverValue] = useState(null);
  const [driverItems, setDriverItems] = useState([]);

  const [mobileValue, setMobileValue] = useState(null);
  const [mobileItems, setMobileItems] = useState(mobileOptions);

  const guardarConfiguracion = async () => {
    try {
      if (!nurseValue || !driverValue || !mobileValue) {
        throw new Error("Complete todos los campos necesarios");
      }
      if (mobileValue.includes("1") || mobileValue.includes("2")) {
        if (nurseValue === ninguno.value) {
          throw new Error(
            "Los móviles 1 y 2 deben tener un enfermero asignado"
          );
        }
      }
      // setData
      const configData = {
        movil: mobileValue,
        chofer: driverValue,
        enfermero: nurseValue,
        medico: user.app_nombre,
      };
      await dispatch(setHcdConfig(configData)).unwrap();
      Alert.alert("Datos guardados con éxito");
      navigation.navigate("CrearHCD");
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    const cargar_datos = async () => {
      if (nurseItems.length && driverItems.length) return;
      setIsLoading(true);
      // getEnfermeros
      const enfermeros = await filterProfessionalsByGroup("ENF");
      const enfermerosFormatted = getFormattedArray(enfermeros, "name");
      setNurseItems([ninguno, ...enfermerosFormatted]);
      // getChoferes
      const choferes = await filterProfessionalsByGroup("CHOF");
      const choferesFormatted = getFormattedArray(choferes, "name");
      // Los choferes pueden ser enfermeros en algunos casos
      setDriverItems([...choferesFormatted, ...enfermerosFormatted]);
      setIsLoading(false);
    };
    cargar_datos();
  }, []);

  useEffect(() => {
    if (hcdConfig) {
      setNurseValue(hcdConfig.enfermero);
      setDriverValue(hcdConfig.chofer);
      setMobileValue(hcdConfig.movil);
    }
  }, [hcdConfig]);

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
            value={mobileValue}
            items={mobileItems}
            setValue={setMobileValue}
          />
          <CustomAutocomplete
            label="Chofer"
            value={driverValue}
            items={driverItems}
            setValue={setDriverValue}
            setItems={setDriverItems}
            addCustomItem={true}
          />
          <CustomAutocomplete
            label="Enfermero"
            value={nurseValue}
            items={nurseItems}
            setValue={setNurseValue}
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
