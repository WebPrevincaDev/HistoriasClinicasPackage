import { useRef } from "react";
import { Alert, Modal } from "react-native";
import Signature from "react-native-signature-canvas";
import { colors } from "../../constants";

function ModalRegistrarFirma({ visible, onOK, onRequestClose }) {
  const ref = useRef();

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    Alert.alert(
      "No ha firmado",
      "Por favor, firme en el área correspondiente para poder continuar."
    );
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="fade"
    >
      <Signature
        style={{ flex: 1 }}
        ref={ref}
        onOK={onOK}
        onEmpty={handleEmpty}
        autoClear={true}
        descriptionText={"Registrar firma"}
        imageType={"image/png"}
        confirmText={"Guardar"}
        clearText="Limpiar"
        webStyle={webStyle}
      />
    </Modal>
  );
}

export default ModalRegistrarFirma;

const webStyle = `
  .m-signature-pad--footer .button {
    background-color: ${colors.primary};
    color: ${colors.white};
  }
`;
