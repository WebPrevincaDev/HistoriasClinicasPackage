import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHcdNavigation } from "../../hooks/useHcdNavigation";
import { updateHcd } from "../../store/slices/hcd";
import { getAllByKey } from "../../helpers/data";
import { getFormattedArray } from "../../helpers/CustomAutocomplete";
import { invalidInput } from "../../constants";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomAutocomplete from "../../components/CustomAutocomplete";
import MedicamentoItem from "../../components/MedicamentoItem";

export default function Diagnostico() {
  const dispatch = useDispatch();
  const { navigateAndSetHcdScreen } = useHcdNavigation();
  const { control, handleSubmit } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const [diagnosticoValue, setDiagnosticoValue] = useState(null);
  const [diagnosticoItems, setDiagnosticoItems] = useState([]);

  const [medicamentoValue, setMedicamentoValue] = useState([]);
  const [medicamentoItems, setMedicamentoItems] = useState([]);

  const [selectedMeds, setSelectedMeds] = useState({});

  const onPressSiguiente = (data) => {
    if (!diagnosticoValue) {
      Alert.alert(invalidInput);
      return;
    }

    // creo string a partir de los medicamentos y cantidades seleccionadas. medicamentosStr = "alcohol: 3, etc: 1"
    const medicamentosStr = Object.keys(selectedMeds)
      .map((key) => `${key}: ${selectedMeds[key]}`)
      .join(", ");

    const datos = {
      ...data,
      diagnostico: diagnosticoValue,
      medicamentos: medicamentosStr,
    };
    dispatch(updateHcd(datos));
    navigateAndSetHcdScreen("Desenlace");
  };

  // cargar_datos
  useEffect(() => {
    const cargar_datos = async () => {
      if (diagnosticoItems.length) return;
      setIsLoading(true);
      // getDiagnosticos
      const diagnostico = await getAllByKey("asw.diagnos");
      const diagnosticoFormatted = getFormattedArray(diagnostico, "nombre");
      setDiagnosticoItems(diagnosticoFormatted);
      // getMedicamentos
      const medicamentos = await getAllByKey("asw.medicamentos");
      const medicamentosFormatted = getFormattedArray(medicamentos, "nombre");
      setMedicamentoItems(medicamentosFormatted);
      setIsLoading(false);
    };
    cargar_datos();
  }, []);

  useEffect(() => {
    const newSelectedMeds = {};
    medicamentoValue.forEach((medicamento) => {
      // si el medicamento ya estaba en la lista continúa con la misma cantidad. sino lo agrego con cantidad inicial de 1
      newSelectedMeds[medicamento] = selectedMeds[medicamento] || 1;
    });
    setSelectedMeds(newSelectedMeds);
  }, [medicamentoValue]);

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <CustomAutocomplete
            label="Diagnóstico"
            value={diagnosticoValue}
            items={diagnosticoItems}
            setValue={setDiagnosticoValue}
            required
          />
          <CustomInput
            name="procedimiento"
            label="Procedimiento"
            placeholder="Procedimiento"
            control={control}
            multiline={true}
            numberOfLines={4}
          />
          <CustomInput
            name="epicrisis"
            label="Epicrisis"
            placeholder="Epicrisis"
            control={control}
            rules={{ required: true }}
            multiline={true}
            numberOfLines={4}
          />
          <CustomAutocomplete
            label="Medicamentos"
            value={medicamentoValue}
            items={medicamentoItems}
            setValue={setMedicamentoValue}
            multiple={true}
            showBadgeDot={false}
          />
          {medicamentoValue.map((medicamento) => (
            <MedicamentoItem
              key={medicamento}
              medicamento={medicamento}
              setMedicamentoValue={setMedicamentoValue}
              setSelectedMeds={setSelectedMeds}
              selectedMeds={selectedMeds}
            />
          ))}

          <CustomButton
            text="SIGUIENTE"
            onPress={handleSubmit(onPressSiguiente)}
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
