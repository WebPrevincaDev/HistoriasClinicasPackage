import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const CustomAutocomplete = ({ label, required, ...dropDownProps }) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text>
        {label}
        {required && <Text style={{ color: "red" }}> *</Text>}
      </Text>
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        searchable={true}
        searchWithRegionalAccents={true}
        searchPlaceholder="Buscar..."
        placeholder="Seleccione un elemento"
        {...dropDownProps}
        style={styles.dropDown}
        dropDownContainerStyle={styles.dropDownContainer}
        arrowIconStyle={styles.arrowIcon}
      />
    </View>
  );
};

export default CustomAutocomplete;

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  dropDown: {
    backgroundColor: "white",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    minHeight: 40,
  },
  dropDownContainer: {
    backgroundColor: "white",
    borderColor: "#e8e8e8",
  },
  arrowIcon: {
    width: 16,
    height: 16,
  },
});
