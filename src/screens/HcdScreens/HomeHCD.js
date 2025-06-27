import { Alert, FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { updateHcd } from "../../store/slices/hcd";
import { syncHcd }   from "../../store/slices/hcd/thunks";
import Container from "../../components/Container";
import CustomButton from "../../components/CustomButton";
import Title from "../../components/Title";
import Loader from "../../components/Loader";
import { colors } from "../../constants";

const HomeHCD = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const { hcdConfig, arr_hcd, isLoading, error } = useSelector((state) => state.hcd);

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

  const handleSincronizarClick = () => {
    dispatch(syncHcd({ new_arr_hcd: arr_hcd }));
  }

  if (!user) return null;

  return (
    <Container>
      <Title>Médico: {user.nombre}</Title>
      <CustomButton text="AGREGAR" onPress={addNewHistoriaClinica} />
      {!!arr_hcd.length && <CustomButton 
                              type="SECONDARY"
                              text="SINCRONIZAR" 
                              onPress={handleSincronizarClick}         />
      }
      <Text style={{color:colors.primary}}>{error}</Text>
      { 
      isLoading ? 
        <Loader /> : 
        <FlatList
        data={arr_hcd}
        style={{ width: '100%', marginTop: 16 }}
        renderItem={({ item }) => (
          <View style={{ padding: 16, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#f9f9f9', marginBottom: 8 }}>
              <Text>Paciente: {item.pac_apellido || 'Sin Paciente'}</Text>
              <Text>{ item.motivo_cancelacion ? <>CANCELADA: {item.motivo_cancelacion} </> : <> Tipo: {item.ubicacion_atencion} </>} </Text>
            </View>
          )}
          keyExtractor={(item) => item.key}
          />
      }

    </Container>
  );
};

export default HomeHCD;
