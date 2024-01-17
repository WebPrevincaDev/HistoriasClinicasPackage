import { useEffect, useState } from "react";
import { Text, Alert, Image } from "react-native";
import { useDispatch } from "react-redux";
import { useCustomForm } from "../../hooks/useCustomForm";
import { useHcdNavigation } from "../../hooks/useHcdNavigation";
import { useCheckbox } from "../../hooks/useCheckbox";
import { useDropdown } from "../../hooks/useDropdown";
import { updateHcd } from "../../store/slices/hcd";
import { invalidInput } from "../../constants";
import Container from "../../components/Container";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomAutocomplete from "../../components/CustomAutocomplete";
import ListaCheckbox from "../../components/ListaCheckbox";
import ModalRegistrarFirma from "../../components/ModalRegistrarFirma";
import Loader from "../../components/Loader";
import Form from "../../components/Form";

export default function Desenlace() {
  const dispatch = useDispatch();
  const { navigateAndSetHcdScreen } = useHcdNavigation();
  const { control, handleSubmit } = useCustomForm({
    storeKeys: ["nombre_medico_derivante", "matricula_medico_derivante"],
  });
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
  } = useDropdown({ table: "asw.institucion", storeKey: "instituto" });

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
    <Container scroll>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Form title="Desenlace">
            <ListaCheckbox
              items={desenlaceItems}
              initialValues={desenlaceValue}
              onItemSelect={setDesenlaceValue}
            />
          </Form>

          <Form title="Evolución">
            <ListaCheckbox
              items={evolucionItems}
              initialValues={evolucionValue}
              onItemSelect={setEvolucionValue}
            />
          </Form>

          <Form title="Al llegar al domicilio había">
            <ListaCheckbox
              items={alLlegarItems}
              initialValues={alLlegarValue}
              onItemSelect={setAlLlegarValue}
            />
          </Form>

          {isInternationVisible && (
            <Form title="Datos internación">
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
                keyboardType="number-pad"
              />
            </Form>
          )}

          <CustomButton
            text="SIGUIENTE"
            onPress={handleSubmit(onPressSiguiente)}
          />
        </>
      )}
    </Container>
  );
}
