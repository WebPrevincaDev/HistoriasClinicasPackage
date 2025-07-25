import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { CheckBox } from "react-native-elements";
import { colors } from "../../constants";

function ListaCheckbox({ items, onItemSelect, initialValues = [] }) {
  const [selectedItems, setSelectedItems] = useState(initialValues);

  const toggleItem = (item) => {
    const updatedItems = [...selectedItems];
    const itemIndex = updatedItems.indexOf(item);
    if (itemIndex > -1) updatedItems.splice(itemIndex, 1);
    else updatedItems.push(item);
    setSelectedItems(updatedItems);
    onItemSelect(updatedItems);
  };

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <View key={item} style={styles.checkboxContainer}>
          <CheckBox
            title={item}
            checked={selectedItems.includes(item)}
            onPress={() => toggleItem(item)}
            size={16}
            containerStyle={styles.checkbox}
            checkedColor={colors.primary}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  checkboxContainer: {
    width: "50%",
  },
  checkbox: {
    margin: 2,
    marginEnd: 2,
    marginStart: 2,
    flexGrow: 1,
    justifyContent: "center",
  },
});

export default ListaCheckbox;
