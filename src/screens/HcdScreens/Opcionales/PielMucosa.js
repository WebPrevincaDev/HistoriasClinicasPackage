import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { updateHcd } from "../../../store/slices/hcd";
import { useCheckbox } from "../../../hooks/useCheckbox";
import CustomButton from "../../../components/CustomButton";
import ListaCheckbox from "../../../components/ListaCheckbox";
import Form from "../../../components/Form";

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
          <Form title="Piel y mucosa">
            <ListaCheckbox
              items={pielMucosaItems}
              initialValues={pielMucosaValue}
              onItemSelect={setPielMucosaValue}
            />
          </Form>

          <Form title="Edemas">
            <ListaCheckbox
              items={edemasItems}
              initialValues={edemasValue}
              onItemSelect={setEdemasValue}
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
