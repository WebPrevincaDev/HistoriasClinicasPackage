import { StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from "react-native-dropdown-picker";
import Navigation from "./src/navigation";
import { colors } from "./src/constants";
import "./src/helpers/firebase/firebaseconfig";

//Redux
import { store } from "./src/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

//Sentry
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://31650cb3e5dffcacf6aeba342a92b51b@o4509205334982656.ingest.us.sentry.io/4509205338062848",
  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,
});

let persistor = persistStore(store);

DropDownPicker.setListMode("MODAL");
DropDownPicker.setLanguage("ES");

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.container}>
          <Navigation />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default Sentry.wrap(App);
