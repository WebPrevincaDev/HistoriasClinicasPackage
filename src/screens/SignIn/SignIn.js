import {
  Image,
  StyleSheet,
  View,
  useWindowDimensions,
  ScrollView,
  Alert,
} from "react-native";
import PlaceHolderLogo from "../../../assets/images/testLogo.jpg";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/auth/thunks";

const SignIn = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm();

  const { isLoading } = useSelector((state) => state.auth);

  const onSignInPressed = async (data) => {
    try {
      await dispatch(login(data)).unwrap();
      navigation.navigate("Signature");
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  // const onForgotPasswordPressed = () => {
  //   console.warn("Forgot Password");
  //   navigation.navigate("ForgotPassword");
  // };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={PlaceHolderLogo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <View style={{ marginTop: 16 }}>
          <CustomInput
            name={'matricula'}
            placeholder={"Matrícula"}
            control={control}
            rules={{required: 'Se requiere la matrícula'}}
          />

          <CustomInput
            name={'password'}
            placeholder={"Contraseña"}
            control={control}
            secureTextEntry
            rules={{required: 'Por favor ingrese una contraseña'}}
          />

          <CustomButton
            text={isLoading ? "Cargando..." : "Ingresar"}
            disabled={isLoading}
            onPress={handleSubmit(onSignInPressed)}
          />

          {/* <Button onPress={()=>navigation.navigate('Signature')} title="IR A SIGNATURE"/> */}

          {/* <CustomButton
            text={"Olvidé mi Contraseña"}
            onPress={onForgotPasswordPressed}
            type="TERTIARY"
          /> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
    alignSelf: "center",
  },
});
