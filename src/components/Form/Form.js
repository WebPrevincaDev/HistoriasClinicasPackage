import { StyleSheet, View, Text } from "react-native";

function Form({ title, children }) {
  return (
    <View style={styles.form}>
      {title && <Text style={styles.title}>{title}</Text>}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
