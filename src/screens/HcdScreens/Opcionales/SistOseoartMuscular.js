import { ScrollView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { updateHcd } from "../../../store/slices/hcd";
import { useCheckbox } from "../../../hooks/useCheckbox";
import ListaCheckbox from "../../../components/ListaCheckbox";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import sistOseoartMuscular from "../../../placeholder/sistOseoartMuscular.json";
import Form from "../../../components/Form";

export default function SistOseoartMuscular() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();

  const {
    value: sistemaValue,
    setValue: setSistemaValue,
    items: sistemaItems,
  } = useCheckbox({ initialItems: sistOseoartMuscular });

  const onPressGuardar = (data) => {
    const otroValue = data.otro ? ` - ${data.otro}` : "";
    const sist_oseoart_muscular = sistemaValue.join(", ") + otroValue;
    dispatch(updateHcd({ sist_oseoart_muscular }));
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Form title="Sistema oseoart. y muscular">
        <ListaCheckbox
          items={sistemaItems}
          initialValues={sistemaValue}
          onItemSelect={setSistemaValue}
        />
        <CustomInput
          name="otro"
          label="Otro"
          placeholder="Otro"
          control={control}
        />
      </Form>

      <CustomButton text="GUARDAR" onPress={handleSubmit(onPressGuardar)} />
      <CustomButton
        text="CANCELAR"
        onPress={() => navigation.goBack()}
        type="SECONDARY"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
