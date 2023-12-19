// Stack Navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import SignIn from "../../screens/SignIn";
import ForgotPassword from "../../screens/ForgotPassword";
import NewPassword from "../../screens/NewPassword";
import Signature from "../../screens/Signature";
import HomeTabs from "../Tabs/HomeTabs";
import HcdStack from "./HcdStack";

const Stack = createNativeStackNavigator();

const JoinAppStackScreens = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="HomeTab" component={HomeTabs} /> */}
      <Stack.Screen name="HcdStack" component={HcdStack} />
      <Stack.Screen name="Signature" component={Signature} />
    </Stack.Navigator>
  );
};

export default JoinAppStackScreens;
