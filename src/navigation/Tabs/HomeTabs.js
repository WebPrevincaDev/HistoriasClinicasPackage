// Tab Navigator
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Icons
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

// Screens
import Home from "../../screens/Home";
import HcdStack from "../Stacks/HcdStack";
import ProfileStack from "../Stacks/ProfileStack";

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            iconName = focused ? "home-circle-outline" : "home-circle";
            return <MaterialCommunityIcons name="home-circle" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen name="CrearHCD" component={HcdStack} options={{
        tabBarIcon: ({ focused, color, size}) => {
          let iconName;
          iconName = focused ? "add-circle-outline" : "add-circle";
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      }}/>
      <Tab.Screen name="Perfil" component={ProfileStack} options={{
        tabBarIcon: ({ focused, color, size}) => {
          let iconColor;
          iconColor = focused ? "blue" : "black";
          return <FontAwesome5 name="user-md" size={size} color={iconColor} />;
        }
      }}/>
    </Tab.Navigator>
  );
};

export default HomeTabs;
