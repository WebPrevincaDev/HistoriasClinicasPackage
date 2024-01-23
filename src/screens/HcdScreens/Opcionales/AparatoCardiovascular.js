import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { updateHcd } from "../../../store/slices/hcd";
import { useCheckbox } from "../../../hooks/useCheckbox";
import Container from "../../../components/Container";
import CustomButton from "../../../components/CustomButton";
import ListaCheckbox from "../../../components/ListaCheckbox";
import Loader from "../../../components/Loader";
import Form from "../../../components/Form";

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
    <Container scroll>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Form title="Aparato cardiovascular">
            <ListaCheckbox
              items={apCardioItems}
              initialValues={apCardioValue}
              onItemSelect={setApCardioValue}
            />
          </Form>

          <Form title="Soplo">
            <ListaCheckbox
              items={soploItems}
              initialValues={soploValue}
              onItemSelect={setSoploValue}
            />
          </Form>

          <Form title="Pulso">
            <ListaCheckbox
              items={pulsoItems}
              initialValues={pulsoValue}
              onItemSelect={setPulsoValue}
            />
          </Form>

          <CustomButton text="GUARDAR" onPress={onPressGuardar} />
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
