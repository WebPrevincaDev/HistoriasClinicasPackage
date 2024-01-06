import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { resetHcdStore } from "../../store/slices/hcd";
import { logout } from "../../store/slices/auth";

// Assets
import DrProfileIcon from "../../../assets/images/DoctorUserIcon.png";

// Components
import CustomButton from "../../components/CustomButton";
import Form from "../../components/Form";

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetHcdStore());
    navigation.navigate("SignIn");
  };

  if (!user) return null;

  return (
    <View style={styles.container}>
      <Image
        source={DrProfileIcon}
        style={[styles.logo, { height: height * 0.3, marginBottom: 16 }]}
        resizeMode="contain"
      />

      <Form>
        <Text style={styles.title}>Nombre</Text>
        <Text style={styles.data}>{user.nombre}</Text>

        <View style={styles.divider} />

        <Text style={styles.title}>Matrícula</Text>
        <Text style={styles.data}>{user.matricula}</Text>
      </Form>

      <CustomButton text="CERRAR SESIÓN" onPress={handleLogout} type="SIMPLE" />
    </View>
  );
};

export default Profile;

// Plantearse crear un componente "infoComponent"
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    color: "#AAAAAA",
  },

  data: {
    fontSize: 24,
  },

  divider: {
    height: 2,
    backgroundColor: "#EEEEEE",
    marginVertical: 16,
  },

  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
    alignSelf: "center",
  },
});
