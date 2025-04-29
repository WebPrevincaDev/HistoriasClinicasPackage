import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { updateHcd } from "../../../store/slices/hcd";
import { useCheckbox } from "../../../hooks/useCheckbox";
import Container from "../../../components/Container";
import CustomButton from "../../../components/CustomButton";
import ListaCheckbox from "../../../components/ListaCheckbox";
import CustomInput from "../../../components/CustomInput";
import Loader from "../../../components/Loader";
import Form from "../../../components/Form";

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
    <Container scroll>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Form title="Cabeza y cuello">
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
          </Form>

          <CustomButton text="GUARDAR" onPress={handleSubmit(onPressGuardar)} />
          <CustomButton
            text="CANCELAR"
            onPress={navigation.goBack}
            type="SIMPLE"
          />
        </>
      )}
    </Container>
  );
}
