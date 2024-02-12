import { View, ScrollView, StyleSheet } from "react-native";

function Container({ scroll, children, ...containerProps }) {
  return scroll ? (
    <ScrollView {...containerProps}>
      <View style={styles.container}>{children}</View>
    </ScrollView>
  ) : (
    <View {...containerProps} style={styles.container}>
      {children}
    </View>
  );
}

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
