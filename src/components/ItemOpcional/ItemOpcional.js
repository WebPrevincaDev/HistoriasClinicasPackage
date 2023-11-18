import { View, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { updateHcd } from "../../store/slices/hcd";
import CustomButton from "../../components/CustomButton";

function ItemOpcional({
  label,
  name,
  value,
  textoNormalBtn,
  screen,
  shouldRenderNormalBtn = true,
}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const guardar_normal = () => {
    value = "Normal";
    if (textoNormalBtn) value = textoNormalBtn;
    const payload = { [name]: value };
    dispatch(updateHcd(payload));
  };

  const renderBtnText = () => (
    <>
      <Text>{label}</Text>
      {value && <Text>{`\n${value}`}</Text>}
    </>
  );

  return (
    <View style={styles.item}>
      <View style={styles.col1}>
        <CustomButton
          text={renderBtnText()}
          onPress={() => navigation.navigate(screen)}
          type="SECONDARY"
        />
      </View>

      {shouldRenderNormalBtn && (
        <View style={styles.col2}>
          <CustomButton
            text={textoNormalBtn || "Normal"}
            onPress={guardar_normal}
            type="SECONDARY"
          />
        </View>
      )}
    </View>
  );
}

export default ItemOpcional;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    flexWrap: "wrap",
    textAlign: "center",
  },
  col1: {
    width: "70%",
  },
  col2: {
    width: "30%",
  },
});
