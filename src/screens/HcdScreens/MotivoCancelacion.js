import "react-native-get-random-values";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import * as Application from "expo-application";
import { v5 as uuidv5, v4 as uuidv4 } from "uuid";
import { setHcdScreen } from "../../store/slices/hcd";
import { addHcd } from "../../store/slices/hcd/thunks";
import Container from "../../components/Container";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

export default function MotivoCancelacion() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit } = useForm();
  const { user } = useSelector((state) => state.auth);
  const { hcd, hcdConfig, arr_hcd } = useSelector((state) => state.hcd);

  const onPressGuardar = async (data) => {
    setIsLoading(true);
    const finalHcd = {
      ...hcd,
      ...data,
      key: uuidv5("", uuidv5.DNS),
      id_interno: uuidv4(),
      version_app: Application.nativeBuildVersion,
    };
    await dispatch(
      addHcd({ new_arr_hcd: [...arr_hcd, finalHcd], hcdConfig, user })
    ).unwrap();
    dispatch(setHcdScreen(""));
    navigation.navigate("HomeTab");
    setIsLoading(false);
  };

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
        onPress={handleSubmit(onPressGuardar)}
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
