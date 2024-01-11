import { StyleSheet, View } from "react-native";
import Title from "../Title";

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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
});
