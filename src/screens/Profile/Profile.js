import { StyleSheet, Text, Image, useWindowDimensions } from "react-native";
import Constants from 'expo-constants';
import { useSelector, useDispatch } from "react-redux";
import * as MailComposer from "expo-mail-composer";
import { useNavigation } from "@react-navigation/native";
import { resetHcdStore } from "../../store/slices/hcd";
import { logout } from "../../store/slices/auth";
import { colors } from "../../constants";

// Assets
import icon from "../../../assets/images/doctor-icon.png";

// Components
import Container from "../../components/Container";
import CustomButton from "../../components/CustomButton";
import Form from "../../components/Form";
import Divider from "../../components/Divider";
import Loader from "../../components/Loader";
import fileManagerInstance from "../../data/fileManagerInstance";

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const { user, isLoading } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetHcdStore());
    navigation.navigate("SignIn");
  };

  const version = Constants.expoConfig?.version ||
    Constants.manifest2?.extra?.expoClient?.version;

  if (isLoading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  const backupFiles = async () => {
    try {
      console.log("Iniciando backup de archivos... --------------------------------");
      const allKeys = await fileManagerInstance.getAllInDirectory();
      await fileManagerInstance.save_download_directory(allKeys);
    } catch (error) {
      console.error("Error al crear el backup:", error);
    }
  }

  return (
    <Container>
      <Image
        source={icon}
        style={[styles.logo, { height: height * 0.3, marginBottom: 16 }]}
        resizeMode="contain"
      />

      <Form>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.data}>{user.nombre}</Text>

        <Divider />

        <Text style={styles.label}>Matrícula</Text>
        <Text style={styles.data}>{user.matricula}</Text>
      </Form>

      <Text>App Version: {version}</Text>

      <CustomButton
        text="Crear Backup"
        onPress={backupFiles}
        type="SECONDARY"
      />

      <CustomButton
        text="CERRAR SESIÓN"
        onPress={handleLogout}
        type="PRIMARY"
      />
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({
  label: {
    color: colors.gray,
  },
  data: {
    fontSize: 24,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
    alignSelf: "center",
  },
});
