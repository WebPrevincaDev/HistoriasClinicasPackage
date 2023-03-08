import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import JoinAppStackScreens from "./Stacks/JoinAppStack";

const Navigation = () => {
  return (
    <NavigationContainer>
      <JoinAppStackScreens />
    </NavigationContainer>
  );
};

export default Navigation;
