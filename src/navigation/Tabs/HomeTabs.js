// Tab Navigator
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Icons
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';

// Screens
import Home from "../../screens/Home";
import HcdStack from "../Stacks/HcdStack";

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen name="CrearHCD" component={HcdStack} options={{
        tabBarIcon: ({ focused, color, size}) => {
          let iconName;
          iconName = focused ? "add-circle-outline" : "add-circle";
          return <Ionicons name={iconName} size={size} color={color} />
        }
      }}/>
    </Tab.Navigator>
  );
};

export default HomeTabs;
