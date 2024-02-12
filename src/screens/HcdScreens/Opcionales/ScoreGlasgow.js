import { useEffect, useState } from "react";
import { Image, View, Text, Modal, Alert, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { obtener_hora } from "../../../helpers/common";
import { addScoreGlasgowToHcd } from "../../../store/slices/hcd";
import Container from "../../../components/Container";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import Title from "../../../components/Title";
import Form from "../../../components/Form";

export default function ScoreGlasgow() {
  const dispatch = useDispatch();
  const { medicionesScoreGlasgow } = useSelector((state) => state.hcd.hcd);
  const { control, handleSubmit, watch, setValue } = useForm();
  const [ocular, verbal, motora] = watch(["ocular", "verbal", "motora"]);

  const [total, setTotal] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onPressGuardar = (inputData) => {
    if (!ocular && !verbal && !motora) {
      Alert.alert("Debe completar al menos un campo");
      return;
    }
    dispatch(addScoreGlasgowToHcd({ ...inputData, total }));
    // limpio inputs
    setValue("ocular", "");
    setValue("verbal", "");
    setValue("motora", "");
    closeModal();
  };

  // calcular_total
  useEffect(() => {
    const sum =
      parseInt(ocular || 0) + parseInt(verbal || 0) + parseInt(motora || 0);
    setTotal(sum);
  }, [ocular, verbal, motora]);

  return (
    <Container>
      {medicionesScoreGlasgow?.length ? (
        <FlatList
          data={medicionesScoreGlasgow}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Form>
              <Text>Hora: {item.hora}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ flex: 1 }}>Ocular: {item.ocular}</Text>
                <Text style={{ flex: 1 }}>Motora: {item.motora}</Text>
                <Text style={{ flex: 1 }}>Verbal: {item.verbal}</Text>
              </View>
              <Text style={{ fontWeight: "bold" }}>Total: {item.total}</Text>
            </Form>
          )}
        />
      ) : (
        <Text>No hay registros. Presione el botón para agregar items.</Text>
      )}
      <CustomButton text="AGREGAR" onPress={openModal} />

      <Modal
        visible={isModalOpen}
        onRequestClose={closeModal}
        animationType="fade"
      >
        <Container scroll>
          <Image
            resizeMode="contain"
            source={require("../../../../assets/images/glasgow.png")}
            style={{ width: "100%", height: 152 }}
          />
          <CustomInput
            name="hora"
            label="Hora"
            placeholder="Hora"
            control={control}
            defaultValue={obtener_hora()}
          />
          <CustomInput
            name="ocular"
            label="Ocular"
            placeholder="Ocular"
            control={control}
            keyboardType="number-pad"
          />
          <CustomInput
            name="verbal"
            label="Verbal"
            placeholder="Verbal"
            control={control}
            keyboardType="number-pad"
          />
          <CustomInput
            name="motora"
            label="Motora"
            placeholder="Motora"
            control={control}
            keyboardType="number-pad"
          />
          <Title>Total: {total}</Title>
          <CustomButton text="GUARDAR" onPress={handleSubmit(onPressGuardar)} />
          <CustomButton text="CANCELAR" onPress={closeModal} type="SIMPLE" />
        </Container>
      </Modal>
    </Container>
  );
}
