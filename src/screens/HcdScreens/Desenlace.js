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
import { useCheckbox } from "../../hooks/useCheckbox";
import { useDropdown } from "../../hooks/useDropdown";
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
  const [isInternationVisible, setIsInternationVisible] = useState(true);
  const [signature, setSignature] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    isLoading: isDesenlaceLoading,
    value: desenlaceValue,
    setValue: setDesenlaceValue,
    items: desenlaceItems,
  } = useCheckbox({ table: "asw.des", itemKey: "des_nombre" });

  const {
    isLoading: isEvolucionLoading,
    value: evolucionValue,
    setValue: setEvolucionValue,
    items: evolucionItems,
  } = useCheckbox({ table: "asw.evol", itemKey: "evol_nombre" });

  const {
    isLoading: isAlLlegarLoading,
    value: alLlegarValue,
    setValue: setAlLlegarValue,
    items: alLlegarItems,
  } = useCheckbox({ table: "asw.al_llegar", itemKey: "al_llegar_nombre" });

  const {
    isLoading: isInstitucionesLoading,
    value: institucionesValue,
    setValue: setInstitucionesValue,
    items: institucionesItems,
    setItems: setInstitucionesItems,
  } = useDropdown({ table: "asw.institucion" });

  const isLoading =
    isDesenlaceLoading ||
    isEvolucionLoading ||
    isAlLlegarLoading ||
    isInstitucionesLoading;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleOK = (signature) => {
    setSignature(signature);
    closeModal();
  };

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

  // get_internacion_IsVisible
  useEffect(() => {
    const shouldInternationBeVisible =
      desenlaceValue.includes("Inter. sala gral.") ||
      desenlaceValue.includes("Guarda med.") ||
      desenlaceValue.includes("Queda sala gaurd.") ||
      desenlaceValue.includes("UTI");
    setIsInternationVisible(shouldInternationBeVisible);
  }, [desenlaceValue]);

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
});
