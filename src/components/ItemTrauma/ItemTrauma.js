import { Modal, View, Text, ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTraumaToHcd } from "../../store/slices/hcd";
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

  const renderBtnText = () => (
    <>
      <Text>{label}</Text>
      {value && <Text>{`\n${value}`}</Text>}
    </>
  );

  return (
    <View style={styles.item}>
      <CustomButton
        text={renderBtnText()}
        onPress={openModal}
        type="SECONDARY"
      />

      <Modal
        visible={isModalOpen}
        onRequestClose={closeModal}
        animationType="fade"
      >
        <ScrollView style={styles.container}>
          <ListaCheckbox
            items={items}
            initialValues={checkboxValue}
            onItemSelect={setCheckboxValue}
          />
          <CustomButton text="GUARDAR" onPress={saveTrauma} />
          <CustomButton text="SIN TRAUMA APARENTE" onPress={saveTrauma} />
          <CustomButton text="CANCELAR" onPress={closeModal} type="SECONDARY" />
        </ScrollView>
      </Modal>
    </View>
  );
}

export default ItemTrauma;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: "row",
    flexWrap: "wrap",
    textAlign: "center",
  },
});
