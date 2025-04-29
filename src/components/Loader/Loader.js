import { ActivityIndicator } from "react-native";
import { colors } from "../../constants";

function Loader() {
  return <ActivityIndicator size="large" color={colors.black} />;
}

export default Loader;
