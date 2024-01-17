import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import { useHcdNavigation } from "../../hooks/useHcdNavigation";
import { getOpcionales } from "../../store/slices/hcd";
import Container from "../../components/Container";
import CustomButton from "../../components/CustomButton";
import ItemOpcional from "../../components/ItemOpcional";

export default function Opcionales() {
  const ds = useSelector(getOpcionales);
  const { navigateAndSetHcdScreen } = useHcdNavigation();

  return (
    <Container>
      <FlatList
        data={ds}
        renderItem={({ item }) => <ItemOpcional {...item} />}
      />
      <CustomButton
        text="SIGUIENTE"
        onPress={() => navigateAndSetHcdScreen("Diagnostico")}
      />
    </Container>
  );
}
