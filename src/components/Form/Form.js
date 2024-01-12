import { StyleSheet, View } from "react-native";
import Title from "../Title";
import { colors } from "../../constants";

function Form({ title, children }) {
  return (
    <View style={styles.form}>
      {title && <Title>{title}</Title>}
      {children}
    </View>
  );
}

export default Form;

const styles = StyleSheet.create({
  form: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
});
