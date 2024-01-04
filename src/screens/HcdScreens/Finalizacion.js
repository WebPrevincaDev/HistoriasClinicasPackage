import { useState } from "react";
import { ScrollView, StyleSheet, Text, Alert, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import * as Application from "expo-application";
import * as Print from "expo-print";
import { useDropdown } from "../../hooks/useDropdown";
import { setHcdScreen, updateHcd } from "../../store/slices/hcd";
import { addHcd, agregarPaciente } from "../../store/slices/hcd/thunks";
import { invalidInput } from "../../constants";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomAutocomplete from "../../components/CustomAutocomplete";
import ModalRegistrarFirma from "../../components/ModalRegistrarFirma";
import abonaCopago from "../../placeholder/abonaCopago.json";
import CreatePdfService from "../../services/CreatePdfService";

const cPdf = new CreatePdfService();

export default function Finalizacion() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();
  const { user } = useSelector((state) => state.auth);
  const { hcd, hcdConfig, arr_hcd } = useSelector((state) => state.hcd);
  const [signature, setSignature] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    value: abonaCopagoValue,
    setValue: setAbonaCopagoValue,
    items: abonaCopagoItems,
  } = useDropdown({ initialItems: abonaCopago });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleOK = (signature) => {
    setSignature(signature);
    closeModal();
  };

  const guardarDatos = (data) => {
    if (!signature || abonaCopagoValue === null) {
      Alert.alert(invalidInput);
      return null;
    }
    const datos = {
      ...data,
      abona_copago: abonaCopagoValue,
      firma_pac_acompanante: signature,
    };
    dispatch(updateHcd(datos));
    return datos;
  };

  const onPressFinalizar = (inputData) => {
    const datos = guardarDatos(inputData);
    if (!datos) return;
    const finalHcd = {
      ...hcd,
      ...datos,
      key: uuidv4(),
      version_app: Application.nativeBuildVersion,
    };
    dispatch(agregarPaciente(finalHcd));
    dispatch(addHcd({ newHcd: finalHcd, arr_hcd }));
    dispatch(setHcdScreen(""));
    navigation.navigate("HomeTab");
  };

  const onPressPrevisualizar = (inputData) => {
    const datos = guardarDatos(inputData);
    if (!datos) return;
    navigation.navigate("Previsualizacion");
  };

  const onPressImprimir = async (inputData) => {
    const datos = guardarDatos(inputData);
    if (!datos) return;

    const html = cPdf.create_pdf({
      hcd: { ...hcd, ...datos },
      user,
      hcdConfig,
    });

    await Print.printAsync({
      html,
      width: 612,
      height: 792,
      base64: true,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <CustomAutocomplete
        label="¿Abona copago?"
        value={abonaCopagoValue}
        items={abonaCopagoItems}
        setValue={setAbonaCopagoValue}
        listMode="SCROLLVIEW"
        searchable={false}
        required
      />

      <Text>Firma del paciente/acompañante</Text>
      <Image
        style={{ width: "100%", height: 250 }}
        source={{ uri: signature }}
      />
      <Text>Para modificar la firma registrela nuevamente por favor.</Text>
      <CustomButton text="Registrar firma" onPress={openModal} />
      {isModalOpen && (
        <ModalRegistrarFirma
          visible={isModalOpen}
          onRequestClose={closeModal}
          onOK={handleOK}
        />
      )}
      <CustomInput
        name="aclaracion_pac_acompanante"
        label="Aclaración paciente/acompañante"
        placeholder="Aclaración"
        control={control}
      />
      <CustomInput
        name="dni_pac_acompanante"
        label="DNI paciente/acompañante"
        placeholder="DNI"
        control={control}
        keyboardType="number-pad"
      />

      <CustomButton
        text="PREVISUALIZAR"
        onPress={handleSubmit(onPressPrevisualizar)}
      />
      <CustomButton text="IMPRIMIR" onPress={handleSubmit(onPressImprimir)} />
      <CustomButton text="FINALIZAR" onPress={handleSubmit(onPressFinalizar)} />
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
