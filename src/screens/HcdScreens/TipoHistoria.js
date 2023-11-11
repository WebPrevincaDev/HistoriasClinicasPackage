import { Alert, StyleSheet, View } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHcdNavigation } from "../../hooks/useHcdNavigation";
import { setTipoHistoria } from "../../store/slices/hcd";
import { invalidInput } from "../../constants";
import CustomAutocomplete from "../../components/CustomAutocomplete";
import CustomButton from "../../components/CustomButton";
import tipoHistoria from "../../placeholder/tipoHistoria.json";

export default function TipoHistoria() {
  const dispatch = useDispatch();
  const { navigateAndSetHcdScreen } = useHcdNavigation();

  const [tipoHistoriaValue, setTipoHistoriaValue] = useState(null);
  const [tipoHistoriaItems, setTipoHistoriaItems] = useState(tipoHistoria);

  const onPressSiguiente = () => {
    if (!tipoHistoriaValue) {
      Alert.alert(invalidInput);
      return;
    }
    dispatch(setTipoHistoria(tipoHistoriaValue));
    navigateAndSetHcdScreen("Paciente");
  };

  return (
    <View style={styles.container}>
      <CustomAutocomplete
        label="Tipo de historia"
        value={tipoHistoriaValue}
        items={tipoHistoriaItems}
        setValue={setTipoHistoriaValue}
        required
      />
      <CustomButton text="SIGUIENTE" onPress={onPressSiguiente} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
