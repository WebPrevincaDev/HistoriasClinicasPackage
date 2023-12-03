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

export default function PielMucosa() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    isLoading: isPielMucosaLoading,
    value: pielMucosaValue,
    setValue: setPielMucosaValue,
    items: pielMucosaItems,
  } = useCheckbox({ table: "asw.piel_mucosa", itemKey: "piel_mucosa_nombre" });

  const {
    isLoading: isEdemasLoading,
    value: edemasValue,
    setValue: setEdemasValue,
    items: edemasItems,
  } = useCheckbox({ table: "asw.edema", itemKey: "edema_nombre" });

  const isLoading = isPielMucosaLoading || isEdemasLoading;

  const onPressGuardar = () => {
    const datos = {
      piel_mucosa: pielMucosaValue.join(", "),
      edemas: edemasValue.join(", "),
    };
    dispatch(updateHcd(datos));
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <View style={styles.form}>
            <Text style={styles.title}>Piel y mucosa</Text>
            <ListaCheckbox
              items={pielMucosaItems}
              initialValues={pielMucosaValue}
              onItemSelect={setPielMucosaValue}
            />
          </View>

          <View style={styles.form}>
            <Text style={styles.title}>Edemas</Text>
            <ListaCheckbox
              items={edemasItems}
              initialValues={edemasValue}
              onItemSelect={setEdemasValue}
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
