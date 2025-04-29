import { StyleSheet, Text } from "react-native";
import { colors } from "../../constants";

function RequiredIndicator() {
  return <Text style={styles.required}> *</Text>;
}

export default RequiredIndicator;

const styles = StyleSheet.create({
  required: {
    color: colors.red,
    fontWeight: "bold",
    fontSize: 16,
  },
});
