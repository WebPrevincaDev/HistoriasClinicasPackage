import { TouchableOpacity, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function ButtonInfo({ onPress, icon, text }) {
  // Divido el texto y lo transformo en un array para poder renderizar una palabra debajo de la otra
  const words = text?.split(" ");

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ alignItems: "center" }}>
        <MaterialCommunityIcons name={icon} size={24} />
        {text
          ? words.map((word, index) => (
              <Text key={index} style={{ fontSize: 10, lineHeight: 12 }}>
                {word}
              </Text>
            ))
          : null}
      </View>
    </TouchableOpacity>
  );
}

function HcdHeaderBtns() {
  const navigation = useNavigation();

  return (
    <>
      <ButtonInfo
        text="Signos vitales"
        icon="heart-plus-outline"
        onPress={() => navigation.navigate("SignosVitales")}
      />

      {/* View simula gap */}
      <View style={{ width: 8 }} />
      <ButtonInfo
        text="Score Glasgow"
        icon="chart-box-plus-outline"
        onPress={() => navigation.navigate("ScoreGlasgow")}
      />

      {/* View simula gap */}
      <View style={{ width: 8 }} />
      <ButtonInfo
        text="Cancelar"
        icon="close"
        onPress={() => navigation.navigate("MotivoCancelacion")}
      />
    </>
  );
}

export default HcdHeaderBtns;
