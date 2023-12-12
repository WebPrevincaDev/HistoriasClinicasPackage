import { StyleSheet, Text } from "react-native";
import { Slider } from "react-native-elements";

function CustomSlider({ label, value, setValue }) {
  return (
    <>
      <Text>
        {label} {value} %
      </Text>
      <Slider
        value={value}
        onValueChange={setValue}
        minimumValue={0}
        maximumValue={100}
        step={1}
        thumbStyle={styles.thumb}
      />
    </>
  );
}

export default CustomSlider;

const styles = StyleSheet.create({
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "#3B71F3",
  },
});
