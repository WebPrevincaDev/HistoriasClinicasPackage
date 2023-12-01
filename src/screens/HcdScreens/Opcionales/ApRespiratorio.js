import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { updateHcd } from "../../../store/slices/hcd";
import { getAllByKey } from "../../../helpers/data";
import CustomButton from "../../../components/CustomButton";
import ListaCheckbox from "../../../components/ListaCheckbox";
import CustomInput from "../../../components/CustomInput";

export default function ApRespiratorio() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const [apRespiratorioValue, setApRespiratorioValue] = useState([]);
  const [apRespiratorioItems, setApRespiratorioItems] = useState([]);

  const onPressGuardar = (data) => {
    const otroValue = data.otro ? `, ${data.otro}` : "";
    const ap_respiratorio = apRespiratorioValue.join(", ") + otroValue;
    dispatch(updateHcd({ ap_respiratorio }));
    navigation.goBack();
  };

  useEffect(() => {
    const cargar_datos = async () => {
      if (apRespiratorioItems.length) return;
      setIsLoading(true);
      // getApRespiratorio
      const apRespiratorio = await getAllByKey("asw.ap_respiratorio");
      const apRespiratorioFormatted = apRespiratorio.map((ap) => ap.nombre);
      setApRespiratorioItems(apRespiratorioFormatted);
      setIsLoading(false);
    };
    cargar_datos();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <>
          <View style={styles.form}>
            <Text style={styles.title}>Aparato respiratorio</Text>
            <ListaCheckbox
              items={apRespiratorioItems}
              initialValues={apRespiratorioValue}
              onItemSelect={setApRespiratorioValue}
            />
            <CustomInput
              name="otro"
              label="Otro"
              placeholder="Otro"
              control={control}
            />
          </View>

          <CustomButton text="GUARDAR" onPress={handleSubmit(onPressGuardar)} />
          <CustomButton
            text="CANCELAR"
            onPress={() => navigation.goBack()}
            type="SECONDARY"
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
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
