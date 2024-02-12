import { useState } from "react";
import { Modal, Text, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { useCustomForm } from "../../hooks/useCustomForm";
import { useHcdNavigation } from "../../hooks/useHcdNavigation";
import Container from "../../components/Container";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import ListaCheckbox from "../../components/ListaCheckbox";
import Loader from "../../components/Loader";
import Title from "../../components/Title";
import Form from "../../components/Form";
import FormSignosVitales from "../../components/FormSignosVitales";
import { useCheckbox } from "../../hooks/useCheckbox";
import { updateHcd, addSignosVitalesToHcd } from "../../store/slices/hcd";

export default function DatosIniciales() {
  const dispatch = useDispatch();
  const { navigateAndSetHcdScreen } = useHcdNavigation();
  const { control, handleSubmit, getValues } = useCustomForm({
    storeKeys: ["dias", "horas", "minutos"],
  });

  const {
    isLoading,
    value: antecedentesValue,
    setValue: setAntecedentesValue,
    items: antecedentesItems,
  } = useCheckbox({ table: "asw.antecedente", itemKey: "antecedente_nombre" });

  const [resumenAntecedentes, setResumenAntecedentes] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const saveAntecedentes = () => {
    // guardarValorMostrar
    let finalText = "";
    const antecedentes = antecedentesValue.join(", ");
    const [otros, medicamentos, alergia_medicamentosa] = getValues([
      "antecedentes.otros",
      "antecedentes.medicamentos",
      "antecedentes.alergia_medicamentosa",
    ]);
    if (antecedentes) finalText = `${antecedentes}\n`;
    if (otros) finalText += ` | OTROS: ${otros}\n`;
    if (medicamentos) finalText += ` | MEDICACIÓN HABITUAL: ${medicamentos}`;
    if (alergia_medicamentosa)
      finalText += ` | ALERGIA MEDICAMENTOSA: ${alergia_medicamentosa}`;
    setResumenAntecedentes(finalText);
    closeModal();
  };

  const onPressSiguiente = (inputData) => {
    const [dias, horas, minutos] = getValues(["dias", "horas", "minutos"]);
    if (!dias && !horas && !minutos) {
      Alert.alert(
        "Debe completar algún campo de Tiempo de evolución de los síntomas"
      );
      return;
    }
    const datos = {
      ...inputData,
      // piso la propiedad antecedentes. antes era un obj, ahora un string
      antecedentes: resumenAntecedentes,
    };
    const { signosVitales, ...otherData } = datos;
    dispatch(updateHcd(otherData));
    dispatch(addSignosVitalesToHcd(signosVitales));
    navigateAndSetHcdScreen("Diagnostico");
  };

  return (
    <Container scroll>
      <FormSignosVitales control={control} />

      <Form title="Antecedentes">
        <Text>
          {resumenAntecedentes || "Presione el botón para agregar antecedentes"}
        </Text>
        <CustomButton text="Modificar antecedentes" onPress={openModal} />
        {isLoading ? (
          <Loader />
        ) : (
          <Modal
            visible={isModalOpen}
            onRequestClose={closeModal}
            animationType="fade"
          >
            <Container>
              <Title>Lista de antecedentes</Title>
              <ListaCheckbox
                items={antecedentesItems}
                initialValues={antecedentesValue}
                onItemSelect={setAntecedentesValue}
              />
              <CustomInput
                name="antecedentes.otros"
                label="Otros"
                placeholder="Otros"
                control={control}
              />
              <CustomInput
                name="antecedentes.alergia_medicamentosa"
                label="Alergia medicamentosa"
                placeholder="Alergia medicamentosa"
                control={control}
              />
              <CustomInput
                name="antecedentes.medicamentos"
                label="Medicación habitual"
                placeholder="Medicación habitual"
                control={control}
              />
              <CustomButton text="Confirmar" onPress={saveAntecedentes} />
              <CustomButton
                text="Cancelar"
                onPress={closeModal}
                type="SIMPLE"
              />
            </Container>
          </Modal>
        )}
      </Form>

      <Form title="Tiempo de evolución de los síntomas">
        <CustomInput
          name="dias"
          label="Días"
          placeholder="Días"
          control={control}
          keyboardType="number-pad"
        />
        <CustomInput
          name="horas"
          label="Horas"
          placeholder="Horas"
          control={control}
          keyboardType="number-pad"
        />
        <CustomInput
          name="minutos"
          label="Minutos"
          placeholder="Minutos"
          control={control}
          keyboardType="number-pad"
        />
        <Text>
          Se debe completar alguno de los campos, con uno solo es suficiente
        </Text>
      </Form>

      <CustomButton text="SIGUIENTE" onPress={handleSubmit(onPressSiguiente)} />
    </Container>
  );
}
