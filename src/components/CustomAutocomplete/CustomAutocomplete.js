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
      />
    </View>
  );
};

export default CustomAutocomplete;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
});
