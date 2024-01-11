import { Alert, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import CustomAutocomplete from "../../components/CustomAutocomplete";
import CustomButton from "../../components/CustomButton";
import Loader from "../../components/Loader";
import colors from "../../placeholder/colors.json";
import { updateHcd } from "../../store/slices/hcd";
import { useDropdown } from "../../hooks/useDropdown";
import { useHcdNavigation } from "../../hooks/useHcdNavigation";
import { invalidInput } from "../../constants";

export default function MotivoDelLlamado() {
  const dispatch = useDispatch();
  const { navigateAndSetHcdScreen } = useHcdNavigation();

  const {
    isLoading,
    value: motivoValue,
    setValue: setMotivoValue,
    items: motivoItems,
    setItems: setMotivoItems,
  } = useDropdown({ table: "asw.mla" });

  const {
    value: colorValue,
    setValue: setColorValue,
    items: colorItems,
    setItems: setColorItems,
  } = useDropdown({ initialItems: colors });

  const onPressSiguiente = () => {
    if (!motivoValue || !colorValue) {
      Alert.alert(invalidInput);
      return;
    }
    const data = { llamadaMotivo: motivoValue, llamadaColor: colorValue };
    dispatch(updateHcd(data));
    navigateAndSetHcdScreen("TipoHistoria");
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CustomAutocomplete
            label="Motivo"
            value={motivoValue}
            items={motivoItems}
            setValue={setMotivoValue}
            setItems={setMotivoItems}
            addCustomItem={true}
            required
          />
          <CustomAutocomplete
            label="Color"
            value={colorValue}
            items={colorItems}
            setValue={setColorValue}
            setItems={setColorItems}
            addCustomItem={true}
            required
          />
          <CustomButton text="SIGUIENTE" onPress={onPressSiguiente} />
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
});
