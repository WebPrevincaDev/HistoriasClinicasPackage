import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { updateHcd } from "../../../store/slices/hcd";
import { useCheckbox } from "../../../hooks/useCheckbox";
import CustomButton from "../../../components/CustomButton";
import ListaCheckbox from "../../../components/ListaCheckbox";
import Form from "../../../components/Form";

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
          <Form title="Examen neurológico">
            <ListaCheckbox
              items={examenNeuroItems}
              initialValues={examenNeuroValue}
              onItemSelect={setExamenNeuroValue}
            />
          </Form>

          <Form title="Estado mental">
            <ListaCheckbox
              items={estadoMentalItems}
              initialValues={estadoMentalValue}
              onItemSelect={setEstadoMentalValue}
            />
          </Form>

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
});
