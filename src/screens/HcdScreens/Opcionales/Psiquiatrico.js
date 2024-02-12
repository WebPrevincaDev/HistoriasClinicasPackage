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

export default function Psiquiatrico() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();

  const {
    isLoading,
    value: psiquiatricoValue,
    setValue: setPsiquiatricoValue,
    items: psiquiatricoItems,
  } = useCheckbox({ table: "asw.psi", itemKey: "psi_nombre" });

  const onPressGuardar = (data) => {
    const otroValue = data.otro ? `, ${data.otro}` : "";
    const psiquiatrico = psiquiatricoValue.join(", ") + otroValue;
    dispatch(updateHcd({ psiquiatrico }));
    navigation.goBack();
  };

  return (
    <Container scroll>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Form title="Psiquiátrico">
            <ListaCheckbox
              items={psiquiatricoItems}
              initialValues={psiquiatricoValue}
              onItemSelect={setPsiquiatricoValue}
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
