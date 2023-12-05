import { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHcdNavigation } from "../../hooks/useHcdNavigation";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import ListaCheckbox from "../../components/ListaCheckbox";
import Form from "../../components/Form";
import { useCheckbox } from "../../hooks/useCheckbox";
import { updateHcd } from "../../store/slices/hcd";
import { obtener_hora } from "../../helpers/common";

export default function DatosIniciales() {
  const dispatch = useDispatch();
  const { navigateAndSetHcdScreen } = useHcdNavigation();
  const { control, handleSubmit, getValues } = useForm();

  const {
    isLoading,
    value: antecedentesValue,
    setValue: setAntecedentesValue,
    items: antecedentesItems,
  } = useCheckbox({ table: "asw.antecedente", itemKey: "antecedente_nombre" });

  const [resumenAntecedentes, setResumenAntecedentes] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
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
    setIsModalOpen(false);
  };

  const onPressSiguiente = (data) => {
    const [dias, horas, minutos] = getValues(["dias", "horas", "minutos"]);
    if (!dias && !horas && !minutos) {
      Alert.alert(
        "Debe completar algún campo de Tiempo de evolución de los síntomas"
      );
      return;
    }
    const datos = {
      ...data,
      // piso la propiedad antecedentes. antes era un obj, ahora un string
      antecedentes: resumenAntecedentes,
    };
    dispatch(updateHcd(datos));
    navigateAndSetHcdScreen("Opcionales");
  };

  return (
    <ScrollView style={styles.container}>
      <Form title="Signos vitales">
        <CustomInput
          name="hora"
          label="Hora"
          placeholder="Hora"
          control={control}
          defaultValue={obtener_hora()}
        />
        <CustomInput
          name="tas"
          label="TAS"
          placeholder="TAS"
          control={control}
          rules={{ required: true }}
        />
        <CustomInput
          name="tad"
          label="TAD"
          placeholder="TAD"
          control={control}
          rules={{ required: true }}
        />
        <CustomInput
          name="temperatura"
          label="Temperatura"
          placeholder="Temperatura"
          control={control}
          rules={{ required: true }}
        />
        <CustomInput
          name="frres"
          label="FR. RES"
          placeholder="FR. RES"
          control={control}
          rules={{ required: true }}
        />
        <CustomInput
          name="fc"
          label="FC"
          placeholder="FC"
          control={control}
          rules={{ required: true }}
        />
        <CustomInput
          name="llcap"
          label="LL. CAP"
          placeholder="LL. CAP"
          control={control}
        />
        <CustomInput
          name="glucemia"
          label="Glucemia"
          placeholder="Glucemia"
          control={control}
        />
        <CustomInput
          name="sat_oxigeno"
          label="Sat. Oxígeno"
          placeholder="Sat. Oxígeno"
          control={control}
        />
      </Form>

      <Form title="Antecedentes">
        <Text>
          {resumenAntecedentes || "Presione el botón para agregar antecedentes"}
        </Text>
        <CustomButton text="Modificar antecedentes" onPress={openModal} />
        {isLoading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <Modal
            visible={isModalOpen}
            onRequestClose={closeModal}
            animationType="fade"
          >
            <ScrollView style={styles.container}>
              <Text style={styles.title}>Lista de antecedentes</Text>
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
              <CustomButton text="Confirmar" onPress={closeModal} />
            </ScrollView>
          </Modal>
        )}
      </Form>

      <Form title="Tiempo de evolución de los síntomas">
        <CustomInput
          name="dias"
          label="Días"
          placeholder="Días"
          control={control}
        />
        <CustomInput
          name="horas"
          label="Horas"
          placeholder="Horas"
          control={control}
        />
        <CustomInput
          name="minutos"
          label="Minutos"
          placeholder="Minutos"
          control={control}
        />
        <Text>
          Se debe completar alguno de los campos, con uno solo es suficiente
        </Text>
      </Form>

      <CustomButton text="SIGUIENTE" onPress={handleSubmit(onPressSiguiente)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
