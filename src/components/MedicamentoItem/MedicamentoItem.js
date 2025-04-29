import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../constants";
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
            text={<MaterialCommunityIcons name="minus-thick" size={16} />}
            onPress={onDecrementarCantidad}
            type="SIMPLE"
          />
        </View>

        <Text>{`${selectedMeds[medicamento]}`}</Text>

        <View>
          <CustomButton
            text={<MaterialCommunityIcons name="plus-thick" size={16} />}
            onPress={onIncrementarCantidad}
            type="SIMPLE"
          />
        </View>

        <View>
          <CustomButton
            text={
              <MaterialCommunityIcons
                name="trash-can"
                size={16}
                color={colors.red}
              />
            }
            onPress={onEliminar}
            type="SIMPLE"
          />
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
