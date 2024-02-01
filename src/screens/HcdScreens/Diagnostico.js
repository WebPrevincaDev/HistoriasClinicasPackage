import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { useCustomForm } from "../../hooks/useCustomForm";
import { useHcdNavigation } from "../../hooks/useHcdNavigation";
import { useDropdown } from "../../hooks/useDropdown";
import { updateHcd } from "../../store/slices/hcd";
import { invalidInput } from "../../constants";
import Container from "../../components/Container";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomAutocomplete from "../../components/CustomAutocomplete";
import MedicamentoItem from "../../components/MedicamentoItem";
import Loader from "../../components/Loader";

export default function Diagnostico() {
  const dispatch = useDispatch();
  const { navigateAndSetHcdScreen } = useHcdNavigation();
  const { control, handleSubmit } = useCustomForm({
    storeKeys: ["procedimiento", "epicrisis"],
  });

  const [selectedMeds, setSelectedMeds] = useState({});

  const {
    isLoading: isDiagnosticoLoading,
    value: diagnosticoValue,
    setValue: setDiagnosticoValue,
    items: diagnosticoItems,
  } = useDropdown({ table: "asw.diagnos", storeKey: "diagnostico" });

  const {
    isLoading: isMedicamentoLoading,
    value: medicamentoValue,
    setValue: setMedicamentoValue,
    items: medicamentoItems,
  } = useDropdown({ table: "asw.medicamentos", multiple: true });

  const isLoading = isDiagnosticoLoading || isMedicamentoLoading;

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
    navigateAndSetHcdScreen("Opcionales");
  };

  useEffect(() => {
    const newSelectedMeds = {};
    medicamentoValue.forEach((medicamento) => {
      // si el medicamento ya estaba en la lista continúa con la misma cantidad. sino lo agrego con cantidad inicial de 1
      newSelectedMeds[medicamento] = selectedMeds[medicamento] || 1;
    });
    setSelectedMeds(newSelectedMeds);
  }, [medicamentoValue]);

  return (
    <Container scroll>
      {isLoading ? (
        <Loader />
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
    </Container>
  );
}
