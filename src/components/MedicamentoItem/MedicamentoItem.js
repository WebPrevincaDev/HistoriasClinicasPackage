import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/CustomButton";

function MedicamentoItem({
  medicamento,
  setMedicamentoValue,
  selectedMeds,
  setSelectedMeds,
}) {
  const onDecrementarCantidad = () => {
    // si tengo solo 1 med => lo elimino de la lista
    if (selectedMeds[medicamento] <= 1) return onEliminar();
    setSelectedMeds((prevState) => ({
      ...prevState,
      [medicamento]: prevState[medicamento] - 1,
    }));
  };

  const onIncrementarCantidad = () => {
    setSelectedMeds((prevState) => ({
      ...prevState,
      [medicamento]: prevState[medicamento] + 1,
    }));
  };

  const onEliminar = () => {
    // además de modificar los medicamentos seleccionados, modifico value dropdown
    setMedicamentoValue((prevMedicamento) =>
      prevMedicamento.filter((med) => med !== medicamento)
    );
    setSelectedMeds((prevState) => {
      delete prevState[medicamento];
      return prevState;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.col1}>{medicamento.trim()}</Text>

      <View style={styles.btnContainer}>
        <View>
          <CustomButton
            text="-"
            onPress={onDecrementarCantidad}
            type="SECONDARY"
          />
        </View>

        <Text>{`${selectedMeds[medicamento]}`}</Text>

        <View>
          <CustomButton
            text="+"
            onPress={onIncrementarCantidad}
            type="SECONDARY"
          />
        </View>

        <View>
          <CustomButton text="🗑️" onPress={onEliminar} type="SECONDARY" />
        </View>
      </View>
    </View>
  );
}

export default MedicamentoItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  col1: {
    flex: 1,
  },
});
