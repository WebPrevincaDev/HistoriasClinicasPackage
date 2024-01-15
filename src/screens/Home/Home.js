import { Alert, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import CustomAutocomplete from "../../components/CustomAutocomplete";
import mobileOptions from "../../placeholder/mobiles.json";
import CustomButton from "../../components/CustomButton";
import Loader from "../../components/Loader";
import Title from "../../components/Title";
import { filterProfessionalsByGroup } from "../../helpers/data";
import { setHcdConfig } from "../../store/slices/hcd";
import { getFormattedArray } from "../../helpers/CustomAutocomplete";

const ninguno = { label: "Ninguno", value: "Ninguno" };

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const { hcdConfig } = useSelector((state) => state.hcd);

  const [isLoading, setIsLoading] = useState(false);

  const [nurseValue, setNurseValue] = useState(hcdConfig?.enfermero || null);
  const [nurseItems, setNurseItems] = useState([]);

  const [driverValue, setDriverValue] = useState(hcdConfig?.chofer || null);
  const [driverItems, setDriverItems] = useState([]);

  const [mobileValue, setMobileValue] = useState(hcdConfig?.movil || null);
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
        medico: user.nombre,
      };
      dispatch(setHcdConfig(configData));
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

  if (!user) return null;

  return (
    <View style={styles.container}>
      <Title>Datos</Title>
      <Text>Médico: {user.nombre}</Text>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CustomAutocomplete
            label="Móvil"
            value={mobileValue}
            items={mobileItems}
            setValue={setMobileValue}
            required
          />
          <CustomAutocomplete
            label="Chofer"
            value={driverValue}
            items={driverItems}
            setValue={setDriverValue}
            setItems={setDriverItems}
            addCustomItem={true}
            required
          />
          <CustomAutocomplete
            label="Enfermero"
            value={nurseValue}
            items={nurseItems}
            setValue={setNurseValue}
            setItems={setNurseItems}
            addCustomItem={true}
            required
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
});
