import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setHcdConfig } from "../../store/slices/hcd";
import ModalRegistrarFirma from "../../components/ModalRegistrarFirma";

const Signature = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOK = (firma) => {
    dispatch(setHcdConfig({ firma }));
    setIsModalOpen(false);
    navigation.navigate("HomeTab");
  };

  return <ModalRegistrarFirma visible={isModalOpen} onOK={handleOK} />;
};

export default Signature;
