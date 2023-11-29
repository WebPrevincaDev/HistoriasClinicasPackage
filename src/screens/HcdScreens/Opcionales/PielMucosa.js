import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { updateHcd } from "../../../store/slices/hcd";
import { getAllByKey } from "../../../helpers/data";
import CustomButton from "../../../components/CustomButton";
import ListaCheckbox from "../../../components/ListaCheckbox";

export default function PielMucosa() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const [pielMucosaValue, setPielMucosaValue] = useState([]);
  const [pielMucosaItems, setPielMucosaItems] = useState([]);

  const [edemasValue, setEdemasValue] = useState([]);
  const [edemasItems, setEdemasItems] = useState([]);

  const onPressGuardar = () => {
    const datos = {
      piel_mucosa: pielMucosaValue.join(", "),
      edemas: edemasValue.join(", "),
    };
    dispatch(updateHcd(datos));
    navigation.goBack();
  };

  useEffect(() => {
    const cargar_datos = async () => {
      if (pielMucosaItems.length && edemasItems.length) return;
      setIsLoading(true);
      // getPielMucosa
      const pielMucosa = await getAllByKey("asw.piel_mucosa");
      const pielMucosaFormatted = pielMucosa.map(
        (piel) => piel.piel_mucosa_nombre
      );
      setPielMucosaItems(pielMucosaFormatted);
      // getEdemas
      const edemas = await getAllByKey("asw.edema");
      const edemasFormatted = edemas.map((edema) => edema.edema_nombre);
      setEdemasItems(edemasFormatted);
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
            <Text style={styles.title}>Piel y mucosa</Text>
            <ListaCheckbox
              items={pielMucosaItems}
              initialValues={pielMucosaValue}
              onItemSelect={setPielMucosaValue}
            />
          </View>

          <View style={styles.form}>
            <Text style={styles.title}>Edemas</Text>
            <ListaCheckbox
              items={edemasItems}
              initialValues={edemasValue}
              onItemSelect={setEdemasValue}
            />
          </View>

          <CustomButton text="GUARDAR" onPress={onPressGuardar} />
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
