import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { updateHcd } from "../../../store/slices/hcd";
import { useCheckbox } from "../../../hooks/useCheckbox";
import Container from "../../../components/Container";
import CustomButton from "../../../components/CustomButton";
import ListaCheckbox from "../../../components/ListaCheckbox";
import Loader from "../../../components/Loader";
import Form from "../../../components/Form";
import { useEffect } from "react";

export default function ExamenNeurologico() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { hcd } = useSelector((state) => state.hcd);

  const {
    isLoading: isExamenNeuroLoading,
    value: examenNeuroValue,
    setValue: setExamenNeuroValue,
    items: examenNeuroItems,
  } = useCheckbox({ table: "asw.neuro" });

  const {
    isLoading: isEstadoMentalLoading,
    value: estadoMentalValue,
    setValue: setEstadoMentalValue,
    items: estadoMentalItems,
  } = useCheckbox({ table: "asw.neuro_estado_mental" });

  const isLoading = isExamenNeuroLoading || isEstadoMentalLoading;

  const onPressGuardar = () => {
    const examen_neuro =
      examenNeuroValue.join(", ") + " - " + estadoMentalValue.join(", ");
    dispatch(updateHcd({ examen_neuro }));
    navigation.goBack();
  };

  useEffect(() => {
    // Reset values when the component mounts
    const { examen_neuro } = hcd;
    examen = examen_neuro.split(" - ")
    console.log(examen);
    setExamenNeuroValue(examen[0] ? examen[0].split(", ").map(item => item.toUpperCase()) : []);
    setEstadoMentalValue(examen.length == 2 ? examen[1].split(", ") : []);    
  }, [setExamenNeuroValue, setEstadoMentalValue ]);

  return (
    <Container scroll>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Form title="Examen neurológico">
            <ListaCheckbox
              items={examenNeuroItems}
              initialValues={examenNeuroValue}
              onItemSelect={setExamenNeuroValue}
            />
          </Form>

          <Form title="Estado mental">
            <ListaCheckbox
              items={estadoMentalItems}
              initialValues={estadoMentalValue}
              onItemSelect={setEstadoMentalValue}
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
