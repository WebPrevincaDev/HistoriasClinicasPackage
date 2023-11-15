import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHcdNavigation } from "../../hooks/useHcdNavigation";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomAutocomplete from "../../components/CustomAutocomplete";
import { getAllByKey } from "../../helpers/data";
import { getFormattedArray } from "../../helpers/CustomAutocomplete";
import { setDatosIniciales } from "../../store/slices/hcd";

const obtener_hora = () => {
  const fecha = new Date();
  const hora = fecha.getHours();
  const minutos = fecha.getMinutes();
  let relleno_min = "";
  if (minutos <= 9) relleno_min = "0";
  const horaFinal = hora + ":" + relleno_min + minutos;
  return horaFinal;
};

export default function DatosIniciales() {
  const dispatch = useDispatch();
  const { navigateAndSetHcdScreen } = useHcdNavigation();
  const { control, handleSubmit, getValues, watch } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [antecedentesValue, setAntecedentesValue] = useState([]);
  const [antecedentesItems, setAntecedentesItems] = useState([]);

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
    dispatch(setDatosIniciales(datos));
    navigateAndSetHcdScreen("Opcionales");
  };

  // cargar_datos
  useEffect(() => {
    const cargar_datos = async () => {
      if (antecedentesItems.length) return;
      setIsLoading(true);
      // getAntecedentes_Llamada
      const antecedentes = await getAllByKey("asw.antecedente");
      const antecedentesFormatted = getFormattedArray(antecedentes, "nombre");
      setAntecedentesItems(antecedentesFormatted);
      setIsLoading(false);
    };
    cargar_datos();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* form Signos vitales */}
      <View style={styles.form}>
        <Text style={styles.title}>Signos vitales</Text>
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
      </View>

      {/* form Antecedentes */}
      <View style={styles.form}>
        <Text style={styles.title}>Antecedentes</Text>
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
            <View style={styles.modalView}>
              <Text style={styles.title}>Lista de antecedentes</Text>
              <CustomAutocomplete
                label="Antecedentes (puede seleccionar más de uno)"
                value={antecedentesValue}
                items={antecedentesItems}
                setValue={setAntecedentesValue}
                multiple={true}
                mode="BADGE"
                showBadgeDot={false}
                extendableBadgeContainer={true}
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
            </View>
          </Modal>
        )}
      </View>

      {/* form Tiempo de evolución de los síntomas */}
      <View style={styles.form}>
        <Text style={styles.title}>Tiempo de evolución de los síntomas</Text>
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
      </View>

      <CustomButton text="SIGUIENTE" onPress={handleSubmit(onPressSiguiente)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  form: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  modalView: {
    padding: 16,
  },
});
