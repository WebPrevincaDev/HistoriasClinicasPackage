import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { useHcdNavigation } from "../../hooks/useHcdNavigation";
import { useDropdown } from "../../hooks/useDropdown";
import { updateHcd } from "../../store/slices/hcd";
import { invalidInput } from "../../constants";
import Container from "../../components/Container";
import CustomAutocomplete from "../../components/CustomAutocomplete";
import CustomButton from "../../components/CustomButton";
import tipoHistoria from "../../placeholder/tipoHistoria.json";

export default function TipoHistoria() {
  const dispatch = useDispatch();
  const { navigateAndSetHcdScreen } = useHcdNavigation();

  const {
    value: tipoHistoriaValue,
    setValue: setTipoHistoriaValue,
    items: tipoHistoriaItems,
  } = useDropdown({
    initialItems: tipoHistoria,
    storeKey: "ubicacion_atencion",
  });

  const onPressSiguiente = () => {
    if (!tipoHistoriaValue) {
      Alert.alert(invalidInput);
      return;
    }
    const payload = { ubicacion_atencion: tipoHistoriaValue };
    dispatch(updateHcd(payload));
    navigateAndSetHcdScreen("Paciente");
  };

  return (
    <Container>
      <CustomAutocomplete
        label="Tipo de historia"
        value={tipoHistoriaValue}
        items={tipoHistoriaItems}
        setValue={setTipoHistoriaValue}
        required
      />
      <CustomButton text="SIGUIENTE" onPress={onPressSiguiente} />
    </Container>
  );
}
