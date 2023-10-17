import { StyleSheet, Text, View } from "react-native";
import React from "react";

import DropDownPicker from "react-native-dropdown-picker";

const CustomAutocomplete = ({ value, options, setValue, setOptions, isSerchable, handleOnChange }) => {
  const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(null);
//   const [items, setItems] = useState([
//     { label: "Apple", value: "apple" },
//     { label: "Banana", value: "banana" },
//   ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={options}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setOptions}
      searchable={isSerchable}
      onChangeSearchText={handleOnChange}
    />
  );
};

export default CustomAutocomplete;

const styles = StyleSheet.create({});
