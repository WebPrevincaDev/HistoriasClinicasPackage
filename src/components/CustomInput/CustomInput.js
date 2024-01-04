import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";

const CustomInput = ({
  label,
  placeholder,
  name,
  secureTextEntry,
  control,
  defaultValue = "",
  rules = {},
  multiline,
  numberOfLines,
  keyboardType,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View style={styles.container}>
          {label && (
            <Text>
              {label}
              {rules.required && <Text style={styles.required}> *</Text>}
            </Text>
          )}
          <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={secureTextEntry}
            multiline={multiline}
            numberOfLines={numberOfLines}
            keyboardType={keyboardType}
            style={styles.input(error)}
          />
          {error?.message && <Text style={styles.error}>{error.message}</Text>}
        </View>
      )}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 4,
  },
  required: {
    color: "red",
    fontWeight: "bold",
  },
  input: (error) => ({
    backgroundColor: "white",
    borderColor: error ? "red" : "#e8e8e8",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    minHeight: 40,
  }),
  error: {
    color: "red",
    alignSelf: "stretch",
  },
});
