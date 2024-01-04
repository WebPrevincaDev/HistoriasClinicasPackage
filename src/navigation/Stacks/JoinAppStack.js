import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/auth";
import { resetHcdStore } from "../../store/slices/hcd";
import { isSessionValid } from "../../helpers/auth";

// Stack Navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import SignIn from "../../screens/SignIn";
import Signature from "../../screens/Signature";
import HomeTabs from "../Tabs/HomeTabs";
import HcdStack from "./HcdStack";

const Stack = createNativeStackNavigator();

const JoinAppStackScreens = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { hcdConfig, hcd } = useSelector((state) => state.hcd);

  // si sesión no es válida => SignIn,
  // si no firmó => Signature,
  // si no tiene hcd en proceso => HomeTab,
  // else => HcdStack
  const initialRouteName = !isSessionValid(user)
    ? "SignIn"
    : !hcdConfig.firma
    ? "Signature"
    : !Object.keys(hcd).length
    ? "HomeTab"
    : "HcdStack";

  useEffect(() => {
    // si la sesión no es válida reseteo auth y hcd store
    if (!isSessionValid(user)) {
      dispatch(logout());
      dispatch(resetHcdStore());
    }
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Signature" component={Signature} />
      <Stack.Screen name="HomeTab" component={HomeTabs} />
      <Stack.Screen name="HcdStack" component={HcdStack} />
    </Stack.Navigator>
  );
};

export default JoinAppStackScreens;
