import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { addSignosVitalesToHcd } from "../../store/slices/hcd";
import Container from "../../components/Container";
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
    <Container scroll>
      <FormSignosVitales control={control} />

      <CustomButton text="GUARDAR" onPress={handleSubmit(onPressSiguiente)} />
      <CustomButton
        text="CANCELAR"
        onPress={navigation.goBack}
        type="SECONDARY"
      />
    </Container>
  );
}
