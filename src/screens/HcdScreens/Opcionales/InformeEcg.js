import "react-native-get-random-values";
import { useState, useRef, useEffect } from "react";
import {
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useDropdown } from "../../../hooks/useDropdown";
import { updateHcd } from "../../../store/slices/hcd";
import Container from "../../../components/Container";
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
  const [localImages, setLocalImages] = useState([]);
  const { control, handleSubmit } = useForm();
  // como inicialmente es undef le asigno = [] x default
  const { imagenesEcg: imagenesStore = [], cardio } = useSelector(
    (state) => state.hcd.hcd
  );
  const isRequired = cardio && !cardio.includes("Normal");

  const {
    value: informeEcgValue,
    setValue: setInformeEcgValue,
    items: informeEcgItems,
  } = useDropdown({ initialItems: informeEcg });

  const checkUUID = (str) => {
    const shortStr = str.slice(0, str.length - 5);
    if (shortStr.length !== 36) return str.slice(0, str.length - 4);
    return shortStr;
  };

  const parseImagenesToSave = () => {
    const listUpdated = localImages.map((uriImage) => {
      const splitUri = uriImage.src.split("/");
      const nameImage = splitUri[splitUri.length - 1];
      const newString = checkUUID(nameImage);
      return {
        name: newString,
      };
    });
    return listUpdated;
  };

  const onPressGuardar = (formData) => {
    if (isRequired && !localImages.length) {
      return Alert.alert("Debe subir las imágenes");
    }
    const datos = [];
    if (informeEcgValue) datos.push(informeEcgValue);
    if (formData.informe) datos.push(formData.informe);
    const finalText = datos.join(" - ");
    dispatch(
      updateHcd({ ecg_desc: finalText, imagenesEcg: parseImagenesToSave() })
    );
    navigation.goBack();
  };

  const saveImage = async () => {
    if (image) {
      try {
        const savedImagePath = await filesImgManager.save_imagenesEcg(image);
        const newImg = { id: uuidv4(), src: savedImagePath };
        setLocalImages((prevImgs) => [...prevImgs, newImg]);
        setImage(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteImage = (image) => {
    const imagenesEcgFiltered = localImages.filter(
      (img) => img.id !== image.id
    );
    setLocalImages(imagenesEcgFiltered);
  };

  useEffect(() => {
    (async () => {
      const parseImgStore = imagenesStore.map((img) => img.name);
      const imagenes = await filesImgManager.get_path_imagenesEcg(
        parseImgStore
      );
      const finalImagenesEcg = imagenes.map((img) => ({
        id: uuidv4(),
        src: img,
      }));
      setLocalImages(finalImagenesEcg);
    })();
  }, []);

  return (
    <Container>
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
        data={localImages}
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
      <CustomButton text="CANCELAR" onPress={navigation.goBack} type="SIMPLE" />
    </Container>
  );
}

const styles = StyleSheet.create({
  deleteButtonStyle: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 2,
  },
});
