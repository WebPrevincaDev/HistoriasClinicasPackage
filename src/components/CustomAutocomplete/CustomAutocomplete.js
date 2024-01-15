import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import RequiredIndicator from "../RequiredIndicator";
import { colors } from "../../constants";

const CustomAutocomplete = ({ label, required, ...dropDownProps }) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text>
        {label}
        {required && <RequiredIndicator />}
      </Text>
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        searchable={true}
        searchWithRegionalAccents={true}
        {...dropDownProps}
        style={styles.dropDown}
        dropDownContainerStyle={styles.dropDownContainer}
        arrowIconStyle={styles.arrowIcon}
        placeholderStyle={styles.placeholder}
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
    backgroundColor: colors.white,
    borderColor: colors.grayLight,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    minHeight: 40,
  },
  dropDownContainer: {
    backgroundColor: colors.white,
    borderColor: colors.grayLight,
  },
  arrowIcon: {
    width: 16,
    height: 16,
  },
  placeholder: {
    color: colors.gray,
  },
});
