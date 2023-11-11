import { Alert, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";

const HomeHCD = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const { hcdConfig } = useSelector((state) => state.hcd);

  const addNewHistoriaClinica = () => {
    if (!hcdConfig) {
      Alert.alert("Falta completar configuración");
      navigation.navigate("Home");
      return;
    }
    navigation.navigate("MotivoDelLlamado");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Médico: {user.app_nombre}</Text>
      <CustomButton text="AGREGAR" onPress={addNewHistoriaClinica} />
    </View>
  );
};

export default HomeHCD;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
