import { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  Alert,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { obtener_hora } from "../../../helpers/common";
import { addScoreGlasgowToHcd } from "../../../store/slices/hcd";
import { colors } from "../../../constants";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";

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
    <View style={styles.container}>
      {medicionesScoreGlasgow?.length ? (
        <FlatList
          data={medicionesScoreGlasgow}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ flex: 1 }}>Hora: {item.hora}</Text>
                <Text style={{ flex: 1 }}>Ocular: {item.ocular}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ flex: 1 }}>Motora: {item.motora}</Text>
                <Text style={{ flex: 1 }}>Verbal: {item.verbal}</Text>
              </View>
              <Text style={{ fontWeight: "bold" }}>Total: {item.total}</Text>
            </View>
          )}
        />
      ) : (
        <Text>Presione el botón para agregar items</Text>
      )}
      <CustomButton text="AGREGAR" onPress={openModal} />

      <Modal
        visible={isModalOpen}
        onRequestClose={closeModal}
        animationType="fade"
      >
        <ScrollView style={styles.container}>
          <Image
            resizeMode="contain"
            source={require("../../../../assets/images/glasgow.png")}
            style={{ width: "100%", height: 179 }}
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
          <Text style={styles.total}>Total: {total}</Text>
          <CustomButton text="GUARDAR" onPress={handleSubmit(onPressGuardar)} />
          <CustomButton text="CANCELAR" onPress={closeModal} />
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  total: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
