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
import { useCheckbox } from "../../../hooks/useCheckbox";
import CustomButton from "../../../components/CustomButton";
import ListaCheckbox from "../../../components/ListaCheckbox";

export default function ExamenNeurologico() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    isLoading: isExamenNeuroLoading,
    value: examenNeuroValue,
    setValue: setExamenNeuroValue,
    items: examenNeuroItems,
  } = useCheckbox({ table: "asw.neuro" });

  const {
    isLoading: isEstadoMentalLoading,
    value: estadoMentalValue,
    setValue: setEstadoMentalValue,
    items: estadoMentalItems,
  } = useCheckbox({ table: "asw.neuro_estado_mental" });

  const isLoading = isExamenNeuroLoading || isEstadoMentalLoading;

  const onPressGuardar = () => {
    const examen_neuro =
      examenNeuroValue.join(", ") + " - " + estadoMentalValue.join(", ");
    dispatch(updateHcd({ examen_neuro }));
    navigation.goBack();
  };

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
