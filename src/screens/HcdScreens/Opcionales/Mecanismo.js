import { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useCheckbox } from "../../../hooks/useCheckbox";
import { updateHcd, addTraumaToHcd } from "../../../store/slices/hcd";
import ListaCheckbox from "../../../components/ListaCheckbox";
import CustomButton from "../../../components/CustomButton";
import CustomSlider from "../../../components/CustomSlider";
import CustomInput from "../../../components/CustomInput";
import Form from "../../../components/Form";
import quemaduras from "../../../placeholder/quemaduras.json";

export default function Mecanismo() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [extensionValue, setExtensionValue] = useState(0);
  const [extensionAValue, setExtensionAValue] = useState(0);
  const [extensionABValue, setExtensionABValue] = useState(0);
  const [extensionBValue, setExtensionBValue] = useState(0);
  const { control, handleSubmit } = useForm();

  const {
    isLoading: isMecanismosLoading,
    value: mecanismosValue,
    setValue: setMecanismosValue,
    items: mecanismosItems,
  } = useCheckbox({ table: "asw.mec", itemKey: "mec_nombre" });

  const {
    isLoading: isQuemadurasLoading,
    value: quemadurasValue,
    setValue: setQuemadurasValue,
    items: quemadurasItems,
  } = useCheckbox({ initialItems: quemaduras });

  const isLoading = isMecanismosLoading || isQuemadurasLoading;

  const onPressGuardar = (inputData) => {
    const mecanismo = mecanismosValue.join(", ");
    const quemadura = quemadurasValue.join(", ");
    const datos = [];

    if (mecanismo) datos.push(`MECANISMO: ${mecanismo}`);
    if (quemadura) datos.push(`QUEMADURA: ${quemadura}`);
    if (extensionValue) datos.push(`Extensión quemaduras ${extensionValue} %`);
    if (extensionAValue) datos.push(`A ${extensionAValue} %`);
    if (extensionABValue) datos.push(`AB ${extensionABValue} %`);
    if (extensionBValue) datos.push(`B ${extensionBValue} %`);
    if (inputData.otro) datos.push(inputData.otro);

    const finalText = datos.join(" - ");
    dispatch(updateHcd({ mecanismo: finalText }));
    dispatch(addTraumaToHcd({ zona: "Mecanismo", trauma_tipo: finalText }));
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <Form title="Mecanismo">
            <ListaCheckbox
              items={mecanismosItems}
              initialValues={mecanismosValue}
              onItemSelect={setMecanismosValue}
            />
          </Form>

          <Form title="Quemadura">
            <ListaCheckbox
              items={quemadurasItems}
              initialValues={quemadurasValue}
              onItemSelect={setQuemadurasValue}
            />

            <View style={{ marginTop: 16 }}>
              <CustomSlider
                label="Extensión quemaduras"
                value={extensionValue}
                setValue={setExtensionValue}
              />
              <CustomSlider
                label="A"
                value={extensionAValue}
                setValue={setExtensionAValue}
              />
              <CustomSlider
                label="AB"
                value={extensionABValue}
                setValue={setExtensionABValue}
              />
              <CustomSlider
                label="B"
                value={extensionBValue}
                setValue={setExtensionBValue}
              />
            </View>

            <CustomInput
              name="otro"
              label="Otro"
              placeholder="Otro"
              control={control}
            />
          </Form>

          <CustomButton text="GUARDAR" onPress={handleSubmit(onPressGuardar)} />
          <CustomButton
            text="CANCELAR"
            onPress={navigation.goBack}
            type="SECONDARY"
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
});
