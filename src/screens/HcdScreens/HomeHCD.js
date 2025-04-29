import { Alert, FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { updateHcd } from "../../store/slices/hcd";
import Container from "../../components/Container";
import CustomButton from "../../components/CustomButton";
import Title from "../../components/Title";

const HomeHCD = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const { hcdConfig, arr_hcd } = useSelector((state) => state.hcd);

  const addNewHistoriaClinica = () => {
    if (!hcdConfig) {
      Alert.alert("Falta completar configuración");
      navigation.navigate("Home");
      return;
    }
    dispatch(updateHcd({ fecha: new Date().toISOString() }));
    navigation.reset({
      index: 0,
      routes: [{ name: "HcdStack" }],
    });
  };

  if (!user) return null;

  return (
    <Container>
      <Title>Médico: {user.nombre}</Title>
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
    </Container>
  );
};

export default HomeHCD;
