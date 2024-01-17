import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { updateHcd } from "../../../store/slices/hcd";
import { useCheckbox } from "../../../hooks/useCheckbox";
import Container from "../../../components/Container";
import ListaCheckbox from "../../../components/ListaCheckbox";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import Loader from "../../../components/Loader";
import Form from "../../../components/Form";

export default function Ginecobstetrico() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();

  const {
    isLoading,
    value: gcoValue,
    setValue: setGcoValue,
    items: gcoItems,
  } = useCheckbox({ table: "asw.gco", itemKey: "gco_nombre" });

  const onPressGuardar = (data) => {
    const otroValue = data.otro ? `, ${data.otro}` : "";
    const gco = gcoValue.join(", ") + otroValue;
    dispatch(updateHcd({ gco }));
    navigation.goBack();
  };

  return (
    <Container scroll>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Form title="Ginecobstétrico">
            <ListaCheckbox
              items={gcoItems}
              initialValues={gcoValue}
              onItemSelect={setGcoValue}
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
        </>
      )}
    </Container>
  );
}
