import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import HomeHCD from "../../screens/HcdScreens/HomeHCD";
import MotivoDelLlamado from "../../screens/HcdScreens/MotivoDelLlamado";
import TipoHistoria from "../../screens/HcdScreens/TipoHistoria";

const HCDStack = createNativeStackNavigator();

const HcdStack = () => {
  return (
    <HCDStack.Navigator>
      <HCDStack.Screen
        name="HomeHCD"
        component={HomeHCD}
        options={{ headerShown: false }}
      />
      <HCDStack.Screen
        name="MotivoDelLlamado"
        component={MotivoDelLlamado}
        options={{ title: "Motivo del llamado" }}
      />
      <HCDStack.Screen
        name="TipoHistoria"
        component={TipoHistoria}
        options={{ title: "Tipo de historia" }}
      />
    </HCDStack.Navigator>
  );
};

export default HcdStack;
