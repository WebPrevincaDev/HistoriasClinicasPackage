import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import HomeHCD from "../../screens/HcdScreens/HomeHCD";
import MotivoDelLlamado from "../../screens/HcdScreens/MotivoDelLlamado";

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
    </HCDStack.Navigator>
  );
};

export default HcdStack;
