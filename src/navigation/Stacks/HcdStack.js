import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import HomeHCD from "../../screens/HcdScreens/HomeHCD";

const HCDStack = createNativeStackNavigator();

const HcdStack = () => {
  return (
    <HCDStack.Navigator screenOptions={{ headerShown: false }}>
      <HCDStack.Screen name="HomeHCD" component={HomeHCD} />
      {/* ACA VAN A IR EL RESTO DE SCREENS RELACIONADAS CON LA CREACION DE UNA HCD */}
    </HCDStack.Navigator>
  );
}

export default HcdStack;