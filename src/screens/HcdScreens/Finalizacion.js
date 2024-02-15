import { useState } from "react";
import { Text, Alert, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import * as Print from "expo-print";
import { useDropdown } from "../../hooks/useDropdown";
import { useFinishHcd } from "../../hooks/useFinishHcd";
import { updateHcd } from "../../store/slices/hcd";
import { saveSignature } from "../../helpers/data";
import { invalidInput } from "../../constants";
import Container from "../../components/Container";
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
  const { hcd, hcdConfig } = useSelector((state) => state.hcd);
  const [signature, setSignature] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { finishHcd, isLoading } = useFinishHcd();

  const {
    value: abonaCopagoValue,
    setValue: setAbonaCopagoValue,
    items: abonaCopagoItems,
  } = useDropdown({ initialItems: abonaCopago });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleOK = async (signatureUri) => {
    const firmaId = await saveSignature(signatureUri);
    setSignature({ id: firmaId, uri: signatureUri });
    closeModal();
  };

  const guardarDatos = (data) => {
    if (!signature.id || abonaCopagoValue === null) {
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

  const onPressFinalizar = async (inputData) => {
    const datos = guardarDatos(inputData);
    if (!datos) return;
    await finishHcd(datos);
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
    <Container scroll>
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
        source={{ uri: signature.uri }}
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
        disabled={isLoading}
      />
      <CustomButton
        text="IMPRIMIR"
        onPress={handleSubmit(onPressImprimir)}
        disabled={isLoading}
      />
      <CustomButton
        text={isLoading ? "FINALIZANDO..." : "FINALIZAR"}
        onPress={handleSubmit(onPressFinalizar)}
        disabled={isLoading}
      />
    </Container>
  );
}
