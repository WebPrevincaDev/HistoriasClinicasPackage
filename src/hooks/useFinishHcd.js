import "react-native-get-random-values";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { v5 as uuidv5, v4 as uuidv4 } from "uuid";
import * as Application from "expo-application";
import { addHcd, agregarPaciente } from "../store/slices/hcd/thunks";
import { setHcdScreen } from "../store/slices/hcd";

export const useFinishHcd = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const { hcd, hcdConfig, arr_hcd } = useSelector((state) => state.hcd);

  const finishHcd = (datos) => {
    const finalHcd = {
      ...hcd,
      ...datos,
      key: uuidv5("", uuidv5.DNS),
      id_interno: uuidv4(),
      version_app: Application.nativeBuildVersion,
    };
    dispatch(agregarPaciente(finalHcd));
    dispatch(addHcd({ new_arr_hcd: [...arr_hcd, finalHcd], hcdConfig, user }));
    dispatch(setHcdScreen(""));
    navigation.reset({
      index: 0,
      routes: [{ name: "HomeTab" }],
    });
  };

  return { finishHcd };
};
