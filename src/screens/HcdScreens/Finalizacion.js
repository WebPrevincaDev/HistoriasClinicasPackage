import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as Print from "expo-print";
import * as MailComposer from "expo-mail-composer";
import { useDropdown } from "../../hooks/useDropdown";
import { useFinishHcd } from "../../hooks/useFinishHcd";
import { updateHcd } from "../../store/slices/hcd";
import { invalidInput } from "../../constants";
import Container from "../../components/Container";
import CustomButton from "../../components/CustomButton";
import CustomAutocomplete from "../../components/CustomAutocomplete";
import abonaCopago from "../../placeholder/abonaCopago.json";
import CreatePdfService from "../../services/CreatePdfService";

const cPdf = new CreatePdfService();

export default function Finalizacion() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const { hcd, hcdConfig } = useSelector((state) => state.hcd);
  const { finishHcd } = useFinishHcd();

  const {
    value: abonaCopagoValue,
    setValue: setAbonaCopagoValue,
    items: abonaCopagoItems,
  } = useDropdown({ initialItems: abonaCopago });

  const guardarDatos = () => {
    if (abonaCopagoValue === null) {
      Alert.alert(invalidInput);
      return null;
    }
    const datos = { abona_copago: abonaCopagoValue };
    dispatch(updateHcd(datos));
    return datos;
  };

  const onPressFinalizar = () => {
    const datos = guardarDatos();
    if (!datos) return;
    finishHcd(datos);
  };

  const onPressPrevisualizar = () => {
    const datos = guardarDatos();
    if (!datos) return;
    navigation.navigate("Previsualizacion");
  };

  const onPressImprimir = async () => {
    const datos = guardarDatos();
    if (!datos) return;

    const html = cPdf.create_pdf({
      hcd: { ...hcd, ...datos },
      user,
      hcdConfig,
    });

    await Print.printAsync({
      html,
      width: 612,
      height: 792,
      base64: true,
    });
  };

  const onPressSendMail = async () => {
    const datos = guardarDatos();
    if (!datos) return;

    const html = cPdf.create_pdf({
      hcd: { ...hcd, ...datos },
      user,
      hcdConfig,
    });

    // crear y guardar pdf
    const { uri } = await Print.printToFileAsync({
      html,
      width: 612,
      height: 792,
      base64: true,
    });

    // enviar mail con pdf
    await MailComposer.composeAsync({
      subject: "Historia clínica",
      body: "Adjunto encontrará la historia clínica en formato PDF.",
      attachments: [uri],
    });
  };

  return (
    <Container>
      <CustomAutocomplete
        label="¿Abona copago?"
        value={abonaCopagoValue}
        items={abonaCopagoItems}
        setValue={setAbonaCopagoValue}
        listMode="SCROLLVIEW"
        searchable={false}
        required
      />

      <CustomButton text="FINALIZAR" onPress={onPressFinalizar} />
      <CustomButton
        text="IMPRIMIR"
        onPress={onPressImprimir}
        type="SECONDARY"
      />
      <CustomButton
        text="PREVISUALIZAR"
        onPress={onPressPrevisualizar}
        type="SECONDARY"
      />
      <CustomButton
        text="ENVIAR HISTORIA CLÍNICA POR MAIL"
        onPress={onPressSendMail}
        type="SECONDARY"
      />
    </Container>
  );
}
