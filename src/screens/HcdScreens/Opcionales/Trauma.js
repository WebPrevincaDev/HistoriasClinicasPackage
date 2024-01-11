import { View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getTraumaLugares } from "../../../store/slices/hcd";
import { useCheckbox } from "../../../hooks/useCheckbox";
import CustomButton from "../../../components/CustomButton";
import ItemOpcional from "../../../components/ItemOpcional";
import ItemTrauma from "../../../components/ItemTrauma/ItemTrauma";
import Loader from "../../../components/Loader";

export default function Trauma() {
  const navigation = useNavigation();
  const traumaLugares = useSelector(getTraumaLugares);

  const {
    isLoading,
    value: traumaTipoValue,
    setValue: setTraumaTipoValue,
    items: traumaTipoItems,
  } = useCheckbox({ table: "asw.trauma_tipo", itemKey: "trauma_tipo_nombre" });

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <FlatList
            data={traumaLugares}
            renderItem={({ item }) =>
              !item.screen ? (
                <ItemTrauma
                  {...item}
                  items={traumaTipoItems}
                  checkboxValue={traumaTipoValue}
                  setCheckboxValue={setTraumaTipoValue}
                />
              ) : (
                <ItemOpcional {...item} />
              )
            }
          />
          <CustomButton text="GUARDAR" onPress={() => navigation.goBack()} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
