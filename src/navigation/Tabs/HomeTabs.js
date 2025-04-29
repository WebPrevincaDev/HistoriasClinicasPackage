// Tab Navigator
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Icons
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

// Screens
import Home from "../../screens/Home";
import ProfileStack from "../Stacks/ProfileStack";
import HomeHCD from "../../screens/HcdScreens/HomeHCD";

// Constants
import { colors } from "../../constants";

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="CrearHCD"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CrearHCD"
        component={HomeHCD}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons
              name={focused ? "add-circle" : "add-circle-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
