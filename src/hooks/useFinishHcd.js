import "react-native-get-random-values";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { v5 as uuidv5, v4 as uuidv4 } from "uuid";
import * as Application from "expo-application";
import { addHcd, agregarPaciente, syncHcd } from "../store/slices/hcd/thunks";
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
      // De esta forma siempre se guardan los datos del usuario logeado aqui
      historia_medico: hcdConfig.medico,
      historia_chofer: hcdConfig.chofer,
      historia_enfermero: hcdConfig.enfermero,
      historia_movil_id: hcdConfig.movil,
      firma: user.firma.id,
      // firmas de hcd pueden ser undefined
      firma_pac_acompanante: hcd.firma_pac_acompanante?.id || "",
      firma_med_derivante: hcd.firma_med_derivante?.id || "",
      // Signature
      archivo_firma: user.firma.id,
      key: uuidv5("", uuidv5.DNS),
      id_interno: uuidv4(),
      version_app: Application.nativeBuildVersion,
    };

    const new_arr_hcd = [...arr_hcd, finalHcd]
    dispatch(agregarPaciente(finalHcd));
    dispatch(addHcd({ new_arr_hcd: new_arr_hcd }));
    dispatch(syncHcd({ new_arr_hcd: new_arr_hcd }));
    dispatch(setHcdScreen(""));
    navigation.reset({
      index: 0,
      routes: [{ name: "HomeTab" }],
    });
  };

  return { finishHcd };
};
