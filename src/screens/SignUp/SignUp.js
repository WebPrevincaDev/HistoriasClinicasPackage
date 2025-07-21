import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../store/slices/auth/thunks";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import Container from "../../components/Container";
import Title from "../../components/Title";

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const SignUp = ({ route }) => {
  const matricula = route.params?.matricula;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { control, handleSubmit, watch } = useForm();
  const { isLoading } = useSelector((state) => state.auth);

  const onRegisterPressed = async (data) => {
    try {
      await dispatch(signUp({ ...data, matricula })).unwrap();
      navigation.navigate("Signature");
    } catch (error) {
      Alert.alert(error.message);
    }
  };  

  return (
    <Container scroll>
      <Title>Bienvenido</Title>

      <CustomInput
        label={"Nombre"}
        placeholder={"Escriba su nombre"}
        name={"nombre"}
        control={control}
        rules={{ required: true }}
      />
      <CustomInput
        label={"Email"}
        placeholder={"ejemplo@mail.com"}
        name={"email"}
        control={control}
        rules={{
          required: true,
          pattern: { value: EMAIL_REGEX, message: "Email inválido" },
        }}
      />
      <CustomInput
        label={"Contraseña"}
        placeholder={"Contraseña"}
        name={"password"}
        control={control}
        secureTextEntry
        rules={{ required: true }}
      />
      <CustomInput
        label={"Repita la contraseña"}
        placeholder={"Repita la contraseña"}
        name={"re_password"}
        control={control}
        secureTextEntry
        rules={{
          required: true,
          validate: (val) =>
            val === watch("password") || "Las contraseñas no coinciden",
        }}
      />
      <CustomButton
        text={isLoading ? "Cargando..." : "Registrarme"}
        disabled={isLoading}
        onPress={handleSubmit(onRegisterPressed)}
      />      
    </Container>
  );
};

export default SignUp;
