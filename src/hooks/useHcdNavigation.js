import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setHcdScreen } from "../store/slices/hcd";

export const useHcdNavigation = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const navigateAndSetHcdScreen = (screenName) => {
    navigation.navigate(screenName);
    dispatch(setHcdScreen(screenName));
  };

  return { navigateAndSetHcdScreen };
};
