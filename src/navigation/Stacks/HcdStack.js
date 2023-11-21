import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import HomeHCD from "../../screens/HcdScreens/HomeHCD";
import MotivoDelLlamado from "../../screens/HcdScreens/MotivoDelLlamado";
import TipoHistoria from "../../screens/HcdScreens/TipoHistoria";
import Paciente from "../../screens/HcdScreens/Paciente";
import DatosIniciales from "../../screens/HcdScreens/DatosIniciales";
import Opcionales from "../../screens/HcdScreens/Opcionales";
import Diagnostico from "../../screens/HcdScreens/Diagnostico";
import Desenlace from "../../screens/HcdScreens/Desenlace";

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
      <HCDStack.Screen
        name="Paciente"
        component={Paciente}
        options={{ title: "Paciente" }}
      />
      <HCDStack.Screen
        name="DatosIniciales"
        component={DatosIniciales}
        options={{ title: "Datos Iniciales" }}
      />
      <HCDStack.Screen
        name="Opcionales"
        component={Opcionales}
        options={{ title: "Opcionales" }}
      />
      <HCDStack.Screen
        name="Diagnostico"
        component={Diagnostico}
        options={{ title: "Diagnóstico" }}
      />
      <HCDStack.Screen
        name="Desenlace"
        component={Desenlace}
        options={{ title: "Desenlace" }}
      />
    </HCDStack.Navigator>
  );
};

export default HcdStack;
