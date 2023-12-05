import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { updateHcd } from "../../../store/slices/hcd";
import { useCheckbox } from "../../../hooks/useCheckbox";
import CustomButton from "../../../components/CustomButton";
import ListaCheckbox from "../../../components/ListaCheckbox";

export default function AparatoCardiovascular() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    isLoading: isApCardioLoading,
    value: apCardioValue,
    setValue: setApCardioValue,
    items: apCardioItems,
  } = useCheckbox({ table: "asw.cardio", itemKey: "cardio_nombre" });

  const {
    isLoading: isSoploLoading,
    value: soploValue,
    setValue: setSoploValue,
    items: soploItems,
  } = useCheckbox({ table: "asw.cardio_soplo" });

  const {
    isLoading: isPulsoLoading,
    value: pulsoValue,
    setValue: setPulsoValue,
    items: pulsoItems,
  } = useCheckbox({ table: "asw.cardio_pulso" });

  const isLoading = isApCardioLoading || isSoploLoading || isPulsoLoading;

  const onPressGuardar = () => {
    const cardioData = [];
    const apCardio = apCardioValue.join(", ");
    const soplo = soploValue.join(", ");
    const pulso = pulsoValue.join(", ");
    if (apCardio) cardioData.push(apCardio);
    if (soplo) cardioData.push(`SOPLO: ${soplo}`);
    if (pulso) cardioData.push(`PULSO: ${pulso}`);
    const cardio = cardioData.join(" - ");
    dispatch(updateHcd({ cardio }));
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <View style={styles.form}>
            <Text style={styles.title}>Aparato cardiovascular</Text>
            <ListaCheckbox
              items={apCardioItems}
              initialValues={apCardioValue}
              onItemSelect={setApCardioValue}
            />
          </View>

          <View style={styles.form}>
            <Text style={styles.title}>Soplo</Text>
            <ListaCheckbox
              items={soploItems}
              initialValues={soploValue}
              onItemSelect={setSoploValue}
            />
          </View>

          <View style={styles.form}>
            <Text style={styles.title}>Pulso</Text>
            <ListaCheckbox
              items={pulsoItems}
              initialValues={pulsoValue}
              onItemSelect={setPulsoValue}
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