import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { updateHcd } from "../../store/slices/hcd";
import { colors } from "../../constants";

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

  return (
    <View style={styles.item}>
      <View style={{ width: "70%" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(screen)}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={styles.label}>{label}</Text>
            {value && <Text style={styles.data}>{value}</Text>}
          </View>
        </TouchableOpacity>
      </View>

      {shouldRenderNormalBtn && (
        <View style={{ width: "30%" }}>
          <TouchableOpacity style={styles.button} onPress={guardar_normal}>
            <Text style={styles.label}>{textoNormalBtn || "Normal"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default ItemOpcional;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    textAlign: "center",
  },
  button: {
    flexGrow: 1,
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderColor: colors.grayLight,
    borderWidth: 1,
    borderRadius: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  data: {
    marginTop: 4,
    color: colors.grayDark,
  },
});
