import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SingIn from './src/screens/SingIn';
import SingUp from './src/screens/SingUp';

export default function App() {
  return (
    <View style={styles.container}>
      <SingIn />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});
