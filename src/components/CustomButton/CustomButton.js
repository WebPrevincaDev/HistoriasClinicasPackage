import { StyleSheet, Text, Pressable } from "react-native";

const CustomButton = ({ onPress, text, disabled, type = "PRIMARY" }) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.container(disabled), styles[`container_${type}`]]}
    >
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: (disabled) => ({
    width: "100%",
    padding: 16,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 6,
    opacity: disabled ? 0.6 : 1,
  }),
  container_PRIMARY: {
    backgroundColor: "#3B71F3",
  },
  container_SECONDARY: {
    borderColor: "#3B71F3",
    borderWidth: 2,
  },
  container_TERTIARY: {},
  container_SIMPLE: {
    backgroundColor: "transparent",
  },

  text: {
    fontWeight: "bold",
  },
  text_PRIMARY: {
    color: "white",
  },
  text_SECONDARY: {
    color: "#3B71F3",
  },
  text_TERTIARY: {
    color: "gray",
  },
  text_SIMPLE: {
    color: "#004dff",
    fontSize: 20,
  },
});
