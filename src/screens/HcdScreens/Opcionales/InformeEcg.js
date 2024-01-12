import { useState, useRef } from "react";
import {
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useDropdown } from "../../../hooks/useDropdown";
import { updateHcd } from "../../../store/slices/hcd";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import CameraModal from "../../../components/CameraModal";
import CustomAutocomplete from "../../../components/CustomAutocomplete";
import informeEcg from "../../../placeholder/informeEcg.json";
import { FilesImagenesEcgManager } from "../../../data/FilesImagenesEcgManager";
import { colors } from "../../../constants";

const filesImgManager = new FilesImagenesEcgManager();

export default function InformeEcg() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cameraRef = useRef(null);
  const [image, setImage] = useState(null);
  const { control, handleSubmit } = useForm();
  // como inicialmente es undef le asigno = [] x default
  const { imagenesEcg = [] } = useSelector((state) => state.hcd.hcd);

  const {
    value: informeEcgValue,
    setValue: setInformeEcgValue,
    items: informeEcgItems,
  } = useDropdown({ initialItems: informeEcg });

  const onPressGuardar = (formData) => {
    const datos = [];
    if (informeEcgValue) datos.push(informeEcgValue);
    if (formData.informe) datos.push(formData.informe);
    const finalText = datos.join(" - ");
    dispatch(updateHcd({ ecg_desc: finalText }));
    navigation.goBack();
  };

  const saveImage = async () => {
    if (image) {
      try {
        const savedImagePath = await filesImgManager.save_imagenesEcg(image);
        const newImg = { id: uuidv4(), src: savedImagePath };
        dispatch(updateHcd({ imagenesEcg: [...imagenesEcg, newImg] }));
        setImage(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteImage = (image) => {
    const imagenesEcgFiltered = imagenesEcg.filter(
      (img) => img.id !== image.id
    );
    dispatch(updateHcd({ imagenesEcg: imagenesEcgFiltered }));
  };

  return (
    <View style={styles.container}>
      <CustomAutocomplete
        label="Informe"
        value={informeEcgValue}
        items={informeEcgItems}
        setValue={setInformeEcgValue}
        listMode="SCROLLVIEW"
        searchable={false}
      />
      <CustomInput
        name="informe"
        label="Informe"
        placeholder="Informe"
        control={control}
      />

      <CameraModal
        cameraRef={cameraRef}
        image={image}
        setImage={setImage}
        onSaveImage={saveImage}
        onCancel={() => setImage(null)}
      />

      <FlatList
        data={imagenesEcg}
        numColumns={3}
        renderItem={({ item }) => (
          <View style={{ flex: 1, marginVertical: 8 }}>
            <TouchableOpacity>
              <View style={styles.deleteButtonStyle}>
                <CustomButton
                  text={
                    <MaterialCommunityIcons
                      name="trash-can"
                      size={20}
                      color={colors.red}
                    />
                  }
                  onPress={() => deleteImage(item)}
                  type="SIMPLE"
                />
              </View>
              <Image source={{ uri: item.src }} style={{ height: 120 }} />
            </TouchableOpacity>
          </View>
        )}
      />

      <CustomButton text="GUARDAR" onPress={handleSubmit(onPressGuardar)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  deleteButtonStyle: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 2,
  },
});
