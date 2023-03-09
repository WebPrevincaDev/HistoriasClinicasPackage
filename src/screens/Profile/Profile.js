import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";

// Assets
import DrProfileIcon from "../../../assets/images/DoctorUserIcon.png";

// Components
import CustomButton from "../../components/CustomButton";

const Profile = () => {
  const { height } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <Image
        source={DrProfileIcon}
        style={[styles.logo, { height: height * 0.3 }]}
        resizeMode="contain"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Email</Text>
        <Text style={styles.data}>EMAIL DEL USUARIO</Text>
      </View>

      <CustomButton
        onPress={() => console.warn("SE QUIERE CAMBIAR LA PASS")}
        text="CAMBIAR CONTRASEÑA"
        type="SIMPLE"
      />

      <CustomButton
        onPress={() => console.warn("SE ESTÁ CERRANDO LA SESIÓN")}
        text="CERRAR SESIÓN"
        type="SIMPLE"
      />
    </View>
  );
};

export default Profile;

// Plantearse crear un componente "infoComponent"
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  infoContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    margin: 16,
    elevation: 4,
    padding: 8,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 5,
    shadowRadius: 5,
  },

  title: {
    fontSize: 20,
    color: "#AAAAAA",
    fontWeight: "400",
  },

  data: {
    fontSize: 24,
  },

  space: {
    height: 0,
    borderTopWidth: 2,
    borderColor: "#EEEEEE",
    marginVertical: 8,
  },

  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },

});
