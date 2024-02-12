import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { saveSignature } from "../../helpers/data";
import { updateUser } from "../../store/slices/auth";
import ModalRegistrarFirma from "../../components/ModalRegistrarFirma";

const Signature = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOK = async (firmaUri) => {
    const firmaId = await saveSignature(firmaUri);
    dispatch(updateUser({ firma: { id: firmaId, uri: firmaUri } }));
    setIsModalOpen(false);
    navigation.navigate("HomeTab");
  };

  return <ModalRegistrarFirma visible={isModalOpen} onOK={handleOK} />;
};

export default Signature;
