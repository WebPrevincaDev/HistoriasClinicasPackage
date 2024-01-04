import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";

const HomeHCD = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const { hcdConfig, arr_hcd } = useSelector((state) => state.hcd);

  const addNewHistoriaClinica = () => {
    if (!hcdConfig) {
      Alert.alert("Falta completar configuración");
      navigation.navigate("Home");
      return;
    }
    navigation.navigate("HcdStack");
  };

  if (!user) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Médico: {user.nombre}</Text>
      <CustomButton text="AGREGAR" onPress={addNewHistoriaClinica} />

      <FlatList
        data={arr_hcd}
        renderItem={({ item }) => (
          <View>
            <Text>Paciente: {item.pac_apellido}</Text>
            <Text>Tipo: {item.ubicacion_atencion}</Text>
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
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
