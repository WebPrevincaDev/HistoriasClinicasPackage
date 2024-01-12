import { StyleSheet, Text, Pressable } from "react-native";
import { colors } from "../../constants";

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
    backgroundColor: colors.primary,
  },
  container_SECONDARY: {
    borderColor: colors.primary,
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
    color: colors.white,
  },
  text_SECONDARY: {
    color: colors.primary,
  },
  text_TERTIARY: {
    color: "gray",
  },
  text_SIMPLE: {
    color: colors.primaryDark,
    fontSize: 20,
  },
});
