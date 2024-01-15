import { ScrollView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { addSignosVitalesToHcd } from "../../store/slices/hcd";
import FormSignosVitales from "../../components/FormSignosVitales";
import CustomButton from "../../components/CustomButton";

export default function SignosVitales() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();

  const onPressSiguiente = ({ signosVitales }) => {
    dispatch(addSignosVitalesToHcd(signosVitales));
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <FormSignosVitales control={control} />

      <CustomButton text="GUARDAR" onPress={handleSubmit(onPressSiguiente)} />
      <CustomButton
        text="CANCELAR"
        onPress={navigation.goBack}
        type="SECONDARY"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
