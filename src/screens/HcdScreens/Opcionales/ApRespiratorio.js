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

export default function ApRespiratorio() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();

  const {
    isLoading,
    value: apRespiratorioValue,
    setValue: setApRespiratorioValue,
    items: apRespiratorioItems,
  } = useCheckbox({ table: "asw.ap_respiratorio" });

  const onPressGuardar = (data) => {
    const otroValue = data.otro ? `, ${data.otro}` : "";
    const ap_respiratorio = apRespiratorioValue.join(", ") + otroValue;
    dispatch(updateHcd({ ap_respiratorio }));
    navigation.goBack();
  };

  return (
    <Container scroll>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Form title="Aparato respiratorio">
            <ListaCheckbox
              items={apRespiratorioItems}
              initialValues={apRespiratorioValue}
              onItemSelect={setApRespiratorioValue}
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
