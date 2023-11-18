import { View, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useHcdNavigation } from "../../hooks/useHcdNavigation";
import { getOpcionales } from "../../store/slices/hcd";
import CustomButton from "../../components/CustomButton";
import ItemOpcional from "../../components/ItemOpcional";

export default function Opcionales() {
  const ds = useSelector(getOpcionales);
  const { navigateAndSetHcdScreen } = useHcdNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={ds}
        renderItem={({ item }) => <ItemOpcional {...item} />}
      />
      <CustomButton
        text="SIGUIENTE"
        onPress={() => navigateAndSetHcdScreen("Diagnostico")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
