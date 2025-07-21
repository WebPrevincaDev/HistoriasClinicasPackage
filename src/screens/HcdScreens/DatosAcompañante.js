import { useState } from "react";
import { Alert, Text, Image } from "react-native";
import { useDispatch } from "react-redux";
import { useCustomForm } from "../../hooks/useCustomForm";
import { useHcdNavigation } from "../../hooks/useHcdNavigation";
import { updateHcd } from "../../store/slices/hcd";
import { saveSignature } from "../../helpers/data";
import { invalidInput } from "../../constants";
import Container from "../../components/Container";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import ModalRegistrarFirma from "../../components/ModalRegistrarFirma";

export default function DatosAcompañante() {
  const dispatch = useDispatch();
  const [signature, setSignature] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { navigateAndSetHcdScreen } = useHcdNavigation();
  const { control, handleSubmit } = useCustomForm({
    storeKeys: ["aclaracion_pac_acompanante", "dni_pac_acompanante"],
  });

  const handleOK = async (signatureUri) => {
    const firmaId = await saveSignature(signatureUri);
    setSignature({ id: firmaId, uri: signatureUri });
    closeModal();
  };

  const onPressSiguiente = (data) => {
    if (!signature.id) {
      Alert.alert("Por favor complete la firma del paciente u acompañante.");
      return null;
    }

    const datos = {
      ...data,
      firma_pac_acompanante: signature,
    };

    console.log("Datos Acompañante:", datos);
    dispatch(updateHcd(datos));
    navigateAndSetHcdScreen("Diagnostico");
  };

  return (
    <Container scroll>
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

      <CustomButton text="SIGUIENTE" onPress={handleSubmit(onPressSiguiente)} />
    </Container>
  );
}
