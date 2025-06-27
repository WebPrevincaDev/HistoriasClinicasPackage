import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import JoinAppStackScreens from "./Stacks/JoinAppStack";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

//loadInitialData
import { loadInitialData } from '../store/slices/hcd/index';

const Navigation = () => {

  const dispatch = useDispatch();

   useEffect(() => {
    dispatch(loadInitialData());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <JoinAppStackScreens />
    </NavigationContainer>
  );
};

export default Navigation;
