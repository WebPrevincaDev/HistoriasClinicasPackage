import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import ProfileScreen from "../../screens/Profile";

const Profile = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Profile.Navigator screenOptions={{ headerShown: false }}>
      <Profile.Screen name="Profile" component={ProfileScreen} />
      {/* ACA VAN A IR EL RESTO DE SCREENS RELACIONADAS CON EL PERFIL DEL USUARIO */}
    </Profile.Navigator>
  );
}

export default ProfileStack;