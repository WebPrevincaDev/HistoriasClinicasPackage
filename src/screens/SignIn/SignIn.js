import { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  useWindowDimensions,
  Alert,
} from "react-native";
import { CheckBox } from "react-native-elements";
import logo from "../../../assets/amce-siempre.jpg";
import Container from "../../components/Container";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/auth/thunks";
import { colors } from "../../constants";

const SignIn = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit } = useForm();

  const { isLoading } = useSelector((state) => state.auth);

  const onSignInPressed = async (data) => {
    try {
      await dispatch(login(data)).unwrap();
      navigation.navigate("Signature");
    } catch (error) {
      if (error.message === "Usuario no registrado") {
        navigation.navigate("SignUp", { matricula: data.matricula });
        return;
      }
      Alert.alert(error.message);
    }
  };

  return (
    <Container scroll>
      <Image
        source={logo}
        style={[styles.logo, { height: height * 0.3 }]}
        resizeMode="contain"
      />

      <View style={{ marginTop: 16 }}>
        <CustomInput
          name={'matricula'}
          placeholder={"Matrícula"}
          control={control}
          rules={{required: 'Se requiere la matrícula'}}
          keyboardType="number-pad"
        />

        <CustomInput
          name={'password'}
          placeholder={"Contraseña"}
          control={control}
          secureTextEntry={!showPassword}
          rules={{required: 'Por favor ingrese una contraseña'}}
        />

        <CheckBox
          title="Mostrar contraseña"
          checked={showPassword}
          onPress={() => setShowPassword(!showPassword)}
          size={16}
          checkedColor={colors.primary}
          containerStyle={styles.checkbox}
          textStyle={{ marginStart: 8, fontWeight: "normal" }}
        />

        <CustomButton
          text={isLoading ? "Cargando..." : "Ingresar"}
          disabled={isLoading}
          onPress={handleSubmit(onSignInPressed)}
        />
      </View>
    </Container>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
    alignSelf: "center",
  },
  checkbox: {
    margin: 0,
    marginEnd: 0,
    marginStart: 0,
    backgroundColor: "transparent",
    borderColor: "transparent",
    paddingHorizontal: 0,
    paddingVertical: 8,
  },
});
