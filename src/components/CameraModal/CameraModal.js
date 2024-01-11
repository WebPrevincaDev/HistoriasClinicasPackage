import { useState, useEffect } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImageManipulator from "expo-image-manipulator";
import CustomButton from "../CustomButton";

function CameraModal({ cameraRef, image, setImage, onSaveImage, onCancel }) {
  const [type, setType] = useState(CameraType.back);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        setIsLoading(true);
        const photoInJpg = await cameraRef.current.takePictureAsync();
        const photoInJpegCompressed = await ImageManipulator.manipulateAsync(
          photoInJpg.uri,
          [],
          { compress: 0.5, format: "jpeg" }
        );
        setImage(photoInJpegCompressed.uri);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStatus.status === "granted");
    })();
  }, []);

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Para poder continuar debe otorgar permiso a la app</Text>
      </View>
    );
  }

  return (
    <>
      {/* button abrir modal */}
      <TouchableOpacity style={styles.button} onPress={openModal}>
        <Text>Agregar imagen</Text>
        <MaterialCommunityIcons
          name="camera-plus"
          style={{ marginLeft: 8 }}
          size={20}
        />
      </TouchableOpacity>

      {/* modal */}
      <Modal
        visible={isModalOpen}
        onRequestClose={closeModal}
        animationType="fade"
      >
        <View style={styles.container}>
          {!image ? (
            <>
              {/* si usuario NO sacó foto => renderizo cámara */}
              <Camera style={styles.camera} type={type} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                  <CustomButton
                    text={
                      <MaterialCommunityIcons
                        name="window-close"
                        color="white"
                        size={20}
                      />
                    }
                    onPress={closeModal}
                    disabled={isLoading}
                    type="SIMPLE"
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <CustomButton
                    text={
                      <MaterialCommunityIcons
                        name="camera-flip"
                        color="white"
                        size={20}
                      />
                    }
                    onPress={toggleCameraType}
                    disabled={isLoading}
                    type="SIMPLE"
                  />
                </View>
              </Camera>
              <CustomButton
                text={
                  <MaterialCommunityIcons
                    name="camera"
                    style={{ marginLeft: 8 }}
                    size={24}
                  />
                }
                onPress={takePicture}
                disabled={isLoading}
              />
            </>
          ) : (
            <>
              {/* si usuario sacó foto => renderizo preview */}
              <Image source={{ uri: image }} style={{ flex: 1 }} />
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <CustomButton
                    text={
                      <MaterialCommunityIcons
                        name="trash-can"
                        color="red"
                        size={24}
                      />
                    }
                    onPress={onCancel}
                    type="SIMPLE"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <CustomButton
                    text={
                      <MaterialCommunityIcons
                        name="upload"
                        color="black"
                        size={24}
                      />
                    }
                    onPress={onSaveImage}
                    type="SIMPLE"
                  />
                </View>
              </View>
            </>
          )}
        </View>
      </Modal>
    </>
  );
}

export default CameraModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  camera: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
