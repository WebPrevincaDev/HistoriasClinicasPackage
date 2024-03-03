import { Alert, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { useHcdNavigation } from "../../hooks/useHcdNavigation";
import { getOpcionales } from "../../store/slices/hcd";
import { invalidInput } from "../../constants";
import Container from "../../components/Container";
import CustomButton from "../../components/CustomButton";
import ItemOpcional from "../../components/ItemOpcional";

export default function Opcionales() {
  const { fields, allRequiredFieldsComplete } = useSelector(getOpcionales);
  const { navigateAndSetHcdScreen } = useHcdNavigation();

  const onPressSiguiente = () => {
    if (!allRequiredFieldsComplete) {
      Alert.alert(invalidInput);
      return;
    }
    navigateAndSetHcdScreen("Diagnostico");
  };

  return (
    <Container>
      <FlatList
        data={fields}
        renderItem={({ item }) => <ItemOpcional {...item} />}
      />
      <CustomButton text="SIGUIENTE" onPress={onPressSiguiente} />
    </Container>
  );
}
