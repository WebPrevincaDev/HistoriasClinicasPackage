import { StyleSheet, View } from "react-native";
import { colors } from "../../constants";

function Divider() {
  return <View style={styles.divider} />;
}

export default Divider;

const styles = StyleSheet.create({
  divider: {
    height: 2,
    backgroundColor: colors.grayLight,
    marginVertical: 16,
  },
});
