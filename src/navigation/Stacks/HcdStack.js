import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import MotivoDelLlamado from "../../screens/HcdScreens/MotivoDelLlamado";
import TipoHistoria from "../../screens/HcdScreens/TipoHistoria";
import Paciente from "../../screens/HcdScreens/Paciente";
import DatosIniciales from "../../screens/HcdScreens/DatosIniciales";
import Opcionales from "../../screens/HcdScreens/Opcionales";
import Diagnostico from "../../screens/HcdScreens/Diagnostico";
import Desenlace from "../../screens/HcdScreens/Desenlace";
import Finalizacion from "../../screens/HcdScreens/Finalizacion";
import Previsualizacion from "../../screens/HcdScreens/Previsualizacion";
// Opcionales screens
import ScoreGlasgow from "../../screens/HcdScreens/Opcionales/ScoreGlasgow";
import PielMucosa from "../../screens/HcdScreens/Opcionales/PielMucosa";
import ExamenNeurologico from "../../screens/HcdScreens/Opcionales/ExamenNeurologico";
import ApRespiratorio from "../../screens/HcdScreens/Opcionales/ApRespiratorio";
import CabezaCuello from "../../screens/HcdScreens/Opcionales/CabezaCuello";
import AparatoCardiovascular from "../../screens/HcdScreens/Opcionales/AparatoCardiovascular";
import InformeEcg from "../../screens/HcdScreens/Opcionales/InformeEcg";
import SistOseoartMuscular from "../../screens/HcdScreens/Opcionales/SistOseoartMuscular";
import Abdomen from "../../screens/HcdScreens/Opcionales/Abdomen";
import Urogenital from "../../screens/HcdScreens/Opcionales/Urogenital";
import Ginecobstetrico from "../../screens/HcdScreens/Opcionales/Ginecobstetrico";
import Psiquiatrico from "../../screens/HcdScreens/Opcionales/Psiquiatrico";
import Trauma from "../../screens/HcdScreens/Opcionales/Trauma";
import Mecanismo from "../../screens/HcdScreens/Opcionales/Mecanismo";
import MotivoCancelacion from "../../screens/HcdScreens/MotivoCancelacion";
import SignosVitales from "../../screens/HcdScreens/SignosVitales";
// Components
import HcdHeaderBtns from "../../components/HcdHeaderBtns";

const HCDStack = createNativeStackNavigator();

const HcdStack = () => {
  return (
    <HCDStack.Navigator screenOptions={{ headerRight: HcdHeaderBtns }}>
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
        name="Diagnostico"
        component={Diagnostico}
        options={{ title: "Diagnóstico" }}
      />
      <HCDStack.Screen
        name="Opcionales"
        component={Opcionales}
        options={{ title: "Opcionales" }}
      />
      <HCDStack.Screen
        name="Desenlace"
        component={Desenlace}
        options={{ title: "Desenlace" }}
      />
      <HCDStack.Screen
        name="Finalizacion"
        component={Finalizacion}
        options={{ title: "Finalización" }}
      />
      <HCDStack.Screen
        name="ScoreGlasgow"
        component={ScoreGlasgow}
        options={{ title: "Score de Glasgow", headerRight: null }}
      />
      <HCDStack.Screen
        name="PielMucosa"
        component={PielMucosa}
        options={{ title: "Piel y mucosa / edemas" }}
      />
      <HCDStack.Screen
        name="ExamenNeurologico"
        component={ExamenNeurologico}
        options={{ title: "Examen neurológico" }}
      />
      <HCDStack.Screen
        name="ApRespiratorio"
        component={ApRespiratorio}
        options={{ title: "Ap. respiratorio" }}
      />
      <HCDStack.Screen
        name="CabezaCuello"
        component={CabezaCuello}
        options={{ title: "Cabeza y cuello" }}
      />
      <HCDStack.Screen
        name="AparatoCardiovascular"
        component={AparatoCardiovascular}
        options={{ title: "Aparato cardiovascular" }}
      />
      <HCDStack.Screen
        name="InformeEcg"
        component={InformeEcg}
        options={{ title: "Informe electrocardiograma" }}
      />
      <HCDStack.Screen
        name="SistOseoartMuscular"
        component={SistOseoartMuscular}
        options={{ title: "Sist. Oseoart. y Muscular" }}
      />
      <HCDStack.Screen
        name="Abdomen"
        component={Abdomen}
        options={{ title: "Abdomen" }}
      />
      <HCDStack.Screen
        name="Urogenital"
        component={Urogenital}
        options={{ title: "Urogenital" }}
      />
      <HCDStack.Screen
        name="Ginecobstetrico"
        component={Ginecobstetrico}
        options={{ title: "Ginecobstétrico" }}
      />
      <HCDStack.Screen
        name="Psiquiatrico"
        component={Psiquiatrico}
        options={{ title: "Psiquiátrico" }}
      />
      <HCDStack.Screen
        name="Trauma"
        component={Trauma}
        options={{ title: "Trauma" }}
      />
      <HCDStack.Screen
        name="Mecanismo"
        component={Mecanismo}
        options={{ title: "Mecanismo" }}
      />
      <HCDStack.Screen
        name="Previsualizacion"
        component={Previsualizacion}
        options={{ title: "Previsualización" }}
      />
      <HCDStack.Screen
        name="MotivoCancelacion"
        component={MotivoCancelacion}
        options={{ title: "Motivo de cancelación", headerRight: null }}
      />
      <HCDStack.Screen
        name="SignosVitales"
        component={SignosVitales}
        options={{ title: "Agregar signos vitales", headerRight: null }}
      />
    </HCDStack.Navigator>
  );
};

export default HcdStack;
