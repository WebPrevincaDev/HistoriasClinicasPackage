import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTraumaToHcd } from "../../store/slices/hcd";
import { colors } from "../../constants";
import Container from "../Container";
import CustomButton from "../CustomButton";
import ListaCheckbox from "../ListaCheckbox";

function ItemTrauma({
  label,
  name,
  value,
  items,
  checkboxValue,
  setCheckboxValue,
}) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const saveTrauma = () => {
    const payload = {
      zona: name,
      trauma_tipo: checkboxValue.join(", ") || "Sin trauma aparente",
    };
    dispatch(addTraumaToHcd(payload));
    setIsModalOpen(false);
    setCheckboxValue([]);
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity style={styles.button} onPress={openModal}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.label}>{label}</Text>
          {value && <Text style={styles.data}>{value}</Text>}
        </View>
      </TouchableOpacity>

      <Modal
        visible={isModalOpen}
        onRequestClose={closeModal}
        animationType="fade"
      >
        <Container>
          <ListaCheckbox
            items={items}
            initialValues={checkboxValue}
            onItemSelect={setCheckboxValue}
          />
          <CustomButton text="GUARDAR" onPress={saveTrauma} />
          <CustomButton
            text="SIN TRAUMA APARENTE"
            onPress={saveTrauma}
            type="SECONDARY"
          />
          <CustomButton text="CANCELAR" onPress={closeModal} type="SIMPLE" />
        </Container>
      </Modal>
    </View>
  );
}

export default ItemTrauma;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    textAlign: "center",
  },
  button: {
    flexGrow: 1,
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderColor: colors.grayLight,
    borderWidth: 1,
    borderRadius: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  data: {
    marginTop: 4,
    color: colors.grayDark,
  },
});
