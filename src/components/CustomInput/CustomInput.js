import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";

const CustomInput = ({
  label,
  placeholder,
  name,
  secureTextEntry,
  control,
  rules = {},
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
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
    borderRadius: 5,
    paddingHorizontal: 10,
  }),
  error: {
    color: "red",
    alignSelf: "stretch",
  },
});
