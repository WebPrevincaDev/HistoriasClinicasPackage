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

export default function Urogenital() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();

  const {
    isLoading,
    value: urogenitalValue,
    setValue: setUrogenitalValue,
    items: urogenitalItems,
  } = useCheckbox({ table: "asw.urogen", itemKey: "urogen_nombre" });

  const onPressGuardar = (data) => {
    const otroValue = data.otro ? `, ${data.otro}` : "";
    const urogen = urogenitalValue.join(", ") + otroValue;
    dispatch(updateHcd({ urogen }));
    navigation.goBack();
  };

  return (
    <Container scroll>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Form title="Urogenital">
            <ListaCheckbox
              items={urogenitalItems}
              initialValues={urogenitalValue}
              onItemSelect={setUrogenitalValue}
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
