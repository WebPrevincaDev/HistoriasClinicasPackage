import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useHcdNavigation } from "../../hooks/useHcdNavigation";
import { getAllByKey } from "../../helpers/data";
import { getFormattedArray } from "../../helpers/CustomAutocomplete";
import { updateHcd } from "../../store/slices/hcd";
import { invalidInput } from "../../constants";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomAutocomplete from "../../components/CustomAutocomplete";
import ListaCheckbox from "../../components/ListaCheckbox";
import ModalRegistrarFirma from "../../components/ModalRegistrarFirma/ModalRegistrarFirma";

export default function Desenlace() {
  const dispatch = useDispatch();
  const { navigateAndSetHcdScreen } = useHcdNavigation();
  const { control, handleSubmit } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const [desenlaceValue, setDesenlaceValue] = useState([]);
  const [desenlaceItems, setDesenlaceItems] = useState([]);

  const [evolucionValue, setEvolucionValue] = useState([]);
  const [evolucionItems, setEvolucionItems] = useState([]);

  const [alLlegarValue, setAlLlegarValue] = useState([]);
  const [alLlegarItems, setAlLlegarItems] = useState([]);

  const [institucionesValue, setInstitucionesValue] = useState(null);
  const [institucionesItems, setInstitucionesItems] = useState([]);

  const [isInternationVisible, setIsInternationVisible] = useState(true);

  const onPressSiguiente = (data) => {
    if (
      !desenlaceValue.length ||
      !evolucionValue.length ||
      !alLlegarValue.length ||
      (isInternationVisible && (!signature || !institucionesValue))
    ) {
      Alert.alert(invalidInput);
      return;
    }
    const datos = {
      ...data,
      desenlace: desenlaceValue.join(", "),
      evolucion: evolucionValue.join(", "),
      alLlegar: alLlegarValue.join(", "),
      instituto: institucionesValue,
      firma_med_derivante: signature,
    };
    dispatch(updateHcd(datos));
    navigateAndSetHcdScreen("Finalizacion");
  };

  // cargar_datos
  useEffect(() => {
    const cargar_datos = async () => {
      if (desenlaceItems.length && evolucionItems.length) return;
      setIsLoading(true);
      // getDesenlace
      const desenlace = await getAllByKey("asw.des");
      const desenlaceFormatted = desenlace.map(
        (antecedente) => antecedente.des_nombre
      );
      setDesenlaceItems(desenlaceFormatted);
      // getEvolucion
      const evolucion = await getAllByKey("asw.evol");
      const evolucionFormatted = evolucion.map(
        (antecedente) => antecedente.evol_nombre
      );
      setEvolucionItems(evolucionFormatted);
      // getAlLlegar
      const alLlegar = await getAllByKey("asw.al_llegar");
      const alLlegarFormatted = alLlegar.map(
        (antecedente) => antecedente.al_llegar_nombre
      );
      setAlLlegarItems(alLlegarFormatted);
      // getInstituciones
      const instituciones = await getAllByKey("asw.institucion");
      const institucionesFormatted = getFormattedArray(instituciones, "nombre");
      setInstitucionesItems(institucionesFormatted);
      setIsLoading(false);
    };
    cargar_datos();
  }, []);

  useEffect(() => {
    const shouldInternationBeVisible =
      desenlaceValue.includes("Inter. sala gral.") ||
      desenlaceValue.includes("Guarda med.") ||
      desenlaceValue.includes("Queda sala gaurd.") ||
      desenlaceValue.includes("UTI");
    setIsInternationVisible(shouldInternationBeVisible);
  }, [desenlaceValue]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [signature, setSignature] = useState(null);

  const handleOK = (signature) => {
    setSignature(signature);
    closeModal();
  };

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <View style={styles.form}>
            <Text style={styles.title}>Desenlace</Text>
            <ListaCheckbox
              items={desenlaceItems}
              initialValues={desenlaceValue}
              onItemSelect={setDesenlaceValue}
            />
          </View>

          <View style={styles.form}>
            <Text style={styles.title}>Evolución</Text>
            <ListaCheckbox
              items={evolucionItems}
              initialValues={evolucionValue}
              onItemSelect={setEvolucionValue}
            />
          </View>

          <View style={styles.form}>
            <Text style={styles.title}>Al llegar al domicilio había</Text>
            <ListaCheckbox
              items={alLlegarItems}
              initialValues={alLlegarValue}
              onItemSelect={setAlLlegarValue}
            />
          </View>

          {isInternationVisible && (
            <View style={styles.form}>
              <Text style={styles.title}>Datos internación</Text>
              <Text>Firma del médico derivante</Text>
              <Image
                style={{ width: "100%", height: 250 }}
                source={{ uri: signature }}
              />
              <Text>
                Para modificar la firma registrela nuevamente por favor.
              </Text>
              <CustomButton text="Registrar firma" onPress={openModal} />
              {isModalOpen && (
                <ModalRegistrarFirma
                  visible={isModalOpen}
                  onRequestClose={closeModal}
                  onOK={handleOK}
                />
              )}
              <CustomAutocomplete
                label="Instituto"
                value={institucionesValue}
                items={institucionesItems}
                setValue={setInstitucionesValue}
                setItems={setInstitucionesItems}
                addCustomItem={true}
                required
              />
              <CustomInput
                name="nombre_medico_derivante"
                label="Nombre del médico"
                placeholder="Nombre del médico"
                control={control}
                rules={{ required: true }}
              />
              <CustomInput
                name="matricula_medico_derivante"
                label="Matrícula"
                placeholder="Matrícula"
                control={control}
                rules={{ required: true }}
              />
            </View>
          )}

          <CustomButton
            text="SIGUIENTE"
            onPress={handleSubmit(onPressSiguiente)}
          />
        </>
      )}
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
