import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { updateHcd } from "../../../store/slices/hcd";
import { useCheckbox } from "../../../hooks/useCheckbox";
import CustomButton from "../../../components/CustomButton";
import ListaCheckbox from "../../../components/ListaCheckbox";
import CustomInput from "../../../components/CustomInput";

export default function CabezaCuello() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();

  const {
    isLoading,
    value: cycValue,
    setValue: setCycValue,
    items: cycItems,
  } = useCheckbox({ table: "asw.cyc", itemKey: "cyc_nombre" });

  const onPressGuardar = (data) => {
    const otroValue = data.otro ? `, ${data.otro}` : "";
    const cyc = cycValue.join(", ") + otroValue;
    dispatch(updateHcd({ cyc }));
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <View style={styles.form}>
            <Text style={styles.title}>Cabeza y cuello</Text>
            <ListaCheckbox
              items={cycItems}
              initialValues={cycValue}
              onItemSelect={setCycValue}
            />
            <CustomInput
              name="otro"
              label="Otro"
              placeholder="Otro"
              control={control}
            />
          </View>

          <CustomButton text="GUARDAR" onPress={handleSubmit(onPressGuardar)} />
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
