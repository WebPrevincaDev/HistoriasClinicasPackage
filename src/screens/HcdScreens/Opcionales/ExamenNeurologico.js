import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { updateHcd } from "../../../store/slices/hcd";
import { getAllByKey } from "../../../helpers/data";
import CustomButton from "../../../components/CustomButton";
import ListaCheckbox from "../../../components/ListaCheckbox";

export default function ExamenNeurologico() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const [examenNeuroValue, setExamenNeuroValue] = useState([]);
  const [examenNeuroItems, setExamenNeuroItems] = useState([]);

  const [estadoMentalValue, setEstadoMentalValue] = useState([]);
  const [estadoMentalItems, setEstadoMentalItems] = useState([]);

  const onPressGuardar = () => {
    const examen_neuro =
      examenNeuroValue.join(", ") + " - " + estadoMentalValue.join(", ");
    dispatch(updateHcd({ examen_neuro }));
    navigation.goBack();
  };

  useEffect(() => {
    const cargar_datos = async () => {
      if (estadoMentalItems.length && examenNeuroItems.length) return;
      setIsLoading(true);
      // getExamenNeuro
      const examenNeuro = await getAllByKey("asw.neuro");
      const examenNeuroFormatted = examenNeuro.map((examen) => examen.nombre);
      setExamenNeuroItems(examenNeuroFormatted);
      // getEstadoMental
      const estadoMental = await getAllByKey("asw.neuro_estado_mental");
      const estadoMentalFormatted = estadoMental.map((estado) => estado.nombre);
      setEstadoMentalItems(estadoMentalFormatted);
      setIsLoading(false);
    };
    cargar_datos();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <View style={styles.form}>
            <Text style={styles.title}>Examen neurológico</Text>
            <ListaCheckbox
              items={examenNeuroItems}
              initialValues={examenNeuroValue}
              onItemSelect={setExamenNeuroValue}
            />
          </View>

          <View style={styles.form}>
            <Text style={styles.title}>Estado mental</Text>
            <ListaCheckbox
              items={estadoMentalItems}
              initialValues={estadoMentalValue}
              onItemSelect={setEstadoMentalValue}
            />
          </View>

          <CustomButton text="GUARDAR" onPress={onPressGuardar} />
          <CustomButton
            text="CANCELAR"
            onPress={() => navigation.goBack()}
            type="SECONDARY"
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  form: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
