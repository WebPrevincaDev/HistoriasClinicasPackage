import { ActivityIndicator, Alert, StyleSheet, View, Text } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CustomAutocomplete from "../../components/CustomAutocomplete";
import CustomButton from "../../components/CustomButton";
import { getAllByKey } from "../../helpers/data";
import { getFormattedArray } from "../../helpers/CustomAutocomplete";
import colors from "../../placeholder/colors.json";
import { setLlamado } from "../../store/slices/hcd";
import { useHcdNavigation } from "../../hooks/useHcdNavigation";
import { invalidInput } from "../../constants";

export default function MotivoDelLlamado() {
  const dispatch = useDispatch();
  const { navigateAndSetHcdScreen } = useHcdNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const [motivoValue, setMotivoValue] = useState(null);
  const [motivoItems, setMotivoItems] = useState([]);

  const [colorValue, setColorValue] = useState(null);
  const [colorItems, setColorItems] = useState(colors);

  const onPressSiguiente = () => {
    if (!motivoValue || !colorValue) {
      Alert.alert(invalidInput);
      return;
    }
    const data = { motivo: motivoValue, color: colorValue };
    dispatch(setLlamado(data));
    navigateAndSetHcdScreen("TipoHistoria");
  };

  useEffect(() => {
    const cargar_datos = async () => {
      if (motivoItems.length) return;
      setIsLoading(true);
      // getMotivo_Llamada
      const motivos = await getAllByKey("asw.mla");
      const motivosFormatted = getFormattedArray(motivos, "nombre");
      setMotivoItems(motivosFormatted);
      setIsLoading(false);
    };
    cargar_datos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Motivo del llamado</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <CustomAutocomplete
            label="Motivo"
            value={motivoValue}
            items={motivoItems}
            setValue={setMotivoValue}
            setItems={setMotivoItems}
            addCustomItem={true}
          />
          <CustomAutocomplete
            label="Color"
            value={colorValue}
            items={colorItems}
            setValue={setColorValue}
            setItems={setColorItems}
            addCustomItem={true}
          />
          <CustomButton text="GUARDAR" onPress={onPressSiguiente} />
        </>
      )}
    </View>
  );
}

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
