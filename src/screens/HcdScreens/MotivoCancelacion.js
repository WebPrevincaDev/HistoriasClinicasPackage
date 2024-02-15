import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useFinishHcd } from "../../hooks/useFinishHcd";
import Container from "../../components/Container";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

export default function MotivoCancelacion() {
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();
  const { isLoading, finishHcd } = useFinishHcd();

  return (
    <Container>
      <CustomInput
        name="motivo_cancelacion"
        label="Escribe el motivo de cancelación"
        control={control}
        numberOfLines={6}
        multiline
        rules={{ required: "Debe escribir un motivo de cancelación" }}
      />

      <CustomButton
        text="CONFIRMAR"
        onPress={handleSubmit(finishHcd)}
        disabled={isLoading}
      />
      <CustomButton
        text="VOLVER"
        onPress={navigation.goBack}
        disabled={isLoading}
        type="SIMPLE"
      />
    </Container>
  );
}
