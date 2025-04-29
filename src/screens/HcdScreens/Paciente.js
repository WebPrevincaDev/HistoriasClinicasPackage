import { Alert } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCustomForm } from "../../hooks/useCustomForm";
import { useFinishHcd } from "../../hooks/useFinishHcd";
import Container from "../../components/Container";
import CustomAutocomplete from "../../components/CustomAutocomplete";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import Divider from "../../components/Divider";
import Loader from "../../components/Loader";
import { getAllByKey } from "../../helpers/data";
import { useDropdown } from "../../hooks/useDropdown";
import { useHcdNavigation } from "../../hooks/useHcdNavigation";
import { invalidInput } from "../../constants";
import { updateHcd } from "../../store/slices/hcd";

const initialRequiredOptions = {
  pac_dni: false,
  pac_cobertura: false,
  pac_plan: false,
  pac_nro_socio: false,
  pac_apellido: false,
  pac_nombre: false,
  pac_edad: false,
  pac_localidad: false,
  pac_calle: false,
  pac_interseccion: false,
  pac_nro: false,
  pac_piso: false,
  pac_dto: false,
};

export default function Paciente() {
  const dispatch = useDispatch();
  const { isLoading: isHcdLoading, finishHcd } = useFinishHcd();
  const { navigateAndSetHcdScreen } = useHcdNavigation();
  const { ubicacion_atencion } = useSelector((state) => state.hcd.hcd);
  const { control, handleSubmit, setValue, watch } = useCustomForm({
    storeKeys: [
      "pac_dni",
      "pac_plan",
      "pac_nro_socio",
      "pac_apellido",
      "pac_nombre",
      "pac_edad",
      "pac_calle",
      "pac_interseccion",
      "pac_nro",
      "pac_piso",
      "pac_dto",
    ],
  });
  const [requiredOptions, setRequiredOptions] = useState(
    initialRequiredOptions
  );

  const {
    isLoading: isCoberturaLoading,
    value: coberturaValue,
    setValue: setCoberturaValue,
    items: coberturaItems,
    setItems: setCoberturaItems,
  } = useDropdown({ table: "asw.cobertura", storeKey: "pac_cobertura" });

  const {
    isLoading: isLocalidadLoading,
    value: localidadValue,
    setValue: setLocalidadValue,
    items: localidadItems,
    setItems: setLocalidadItems,
  } = useDropdown({ table: "asw.localidad", storeKey: "pac_localidad" });

  const isLoading = isCoberturaLoading || isLocalidadLoading;

  const onPressSiguiente = (data) => {
    if (
      (requiredOptions.pac_cobertura && !coberturaValue) ||
      (requiredOptions.pac_localidad && !localidadValue)
    ) {
      Alert.alert(invalidInput);
      return;
    }
    const datos = {
      ...data,
      pac_cobertura: coberturaValue,
      pac_localidad: localidadValue,
    };
    dispatch(updateHcd(datos));
    navigateAndSetHcdScreen("DatosIniciales");
  };

  const paciente_ausente = (formData) => {
    Alert.alert(
      "Paciente ausente",
      "¿Desea terminar la Historia Clínica Digital?",
      [
        {
          text: "NO",
        },
        {
          text: "SÍ, TERMINAR",
          onPress: () =>
            finishHcd({
              ...formData,
              pac_cobertura: coberturaValue,
              pac_localidad: localidadValue,
              paciente_ausente: true,
            }),
        },
      ]
    );
  };

  // onChangeForm
  const pac_dni_value = watch("pac_dni");
  useEffect(() => {
    const onChangeForm = async () => {
      if (pac_dni_value?.length >= 7) {
        const pacientes = await getAllByKey("asw.paciente");
        const res = pacientes.find(
          (paciente) => paciente.pac_dni === pac_dni_value
        );
        if (res) {
          // console.log("Encontré un paciente", res);
          setValue("pac_apellido", res.pac_apellido);
          setValue("pac_nombre", res.pac_nombre);
          setValue("pac_calle", res.pac_calle);
          setValue("pac_nro", res.pac_nro);
          setValue("pac_piso", res.pac_piso);
          setValue("pac_interseccion", res.pac_interseccion);
          setValue("pac_plan", res.pac_plan);
          setValue("pac_nro_socio", res.pac_nro_socio);
          setValue("pac_edad", res.pac_edad);
          setValue("pac_dto", res.pac_dto);
          setCoberturaValue(res.pac_cobertura); /* dropdown-picker */
          setLocalidadValue(res.pac_localidad); /* dropdown-picker */
        }
      }
    };
    onChangeForm();
  }, [pac_dni_value]);

  // requerido_x_tipo
  useEffect(() => {
    if (ubicacion_atencion === "DOMICILIO") {
      setRequiredOptions((prevState) => ({
        ...prevState,
        pac_dni: true,
        pac_cobertura: true,
        pac_apellido: true,
        pac_nombre: true,
        pac_localidad: true,
        pac_calle: true,
        pac_nro: true,
      }));
    } else if (ubicacion_atencion === "AREA PROTEGIDA") {
      setRequiredOptions((prevState) => ({
        ...prevState,
        pac_cobertura: true,
        pac_apellido: true,
        pac_nombre: true,
      }));
    } else if (ubicacion_atencion === "VIA PUBLICA") {
      setRequiredOptions((prevState) => ({
        ...prevState,
        pac_localidad: true,
        pac_calle: true,
        pac_interseccion: true,
        pac_nro: true,
      }));
    }
  }, [ubicacion_atencion]);

  return (
    <Container scroll>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CustomInput
            name="pac_dni"
            label="DNI"
            placeholder="DNI"
            control={control}
            rules={{ required: requiredOptions.pac_dni }}
            keyboardType="number-pad"
          />
          <CustomAutocomplete
            label="Cobertura"
            value={coberturaValue}
            items={coberturaItems}
            setValue={setCoberturaValue}
            setItems={setCoberturaItems}
            addCustomItem={true}
            required={requiredOptions.pac_cobertura}
          />
          <CustomInput
            name="pac_plan"
            label="Plan"
            placeholder="Plan"
            control={control}
            rules={{ required: requiredOptions.pac_plan }}
          />
          <CustomInput
            name="pac_nro_socio"
            label="Nro Socio"
            placeholder="Nro de Socio"
            control={control}
            rules={{ required: requiredOptions.pac_nro_socio }}
            keyboardType="number-pad"
          />
          <CustomInput
            name="pac_apellido"
            label="Apellido"
            placeholder="Apellido"
            control={control}
            rules={{ required: requiredOptions.pac_apellido }}
          />
          <CustomInput
            name="pac_nombre"
            label="Nombre"
            placeholder="Nombre"
            control={control}
            rules={{ required: requiredOptions.pac_nombre }}
          />
          <CustomInput
            name="pac_edad"
            label="Edad"
            placeholder="Edad"
            control={control}
            rules={{ required: requiredOptions.pac_edad }}
            keyboardType="number-pad"
          />

          <Divider />

          <CustomAutocomplete
            label="Localidad"
            value={localidadValue}
            items={localidadItems}
            setValue={setLocalidadValue}
            setItems={setLocalidadItems}
            addCustomItem={true}
            required={requiredOptions.pac_localidad}
          />
          <CustomInput
            name="pac_calle"
            label="Calle"
            placeholder="Calle"
            control={control}
            rules={{ required: requiredOptions.pac_calle }}
          />
          <CustomInput
            name="pac_interseccion"
            label="Intersección"
            placeholder="Intersección"
            control={control}
            rules={{ required: requiredOptions.pac_interseccion }}
          />
          <CustomInput
            name="pac_nro"
            label="Nro"
            placeholder="Nro"
            control={control}
            rules={{ required: requiredOptions.pac_nro }}
            keyboardType="number-pad"
          />
          <CustomInput
            name="pac_piso"
            label="Piso"
            placeholder="Piso"
            control={control}
            rules={{ required: requiredOptions.pac_piso }}
            keyboardType="number-pad"
          />
          <CustomInput
            name="pac_dto"
            label="Departamento"
            placeholder="Departamento"
            control={control}
            rules={{ required: requiredOptions.pac_dto }}
          />

          <CustomButton
            text="CONFIRMAR"
            onPress={handleSubmit(onPressSiguiente)}
            disabled={isHcdLoading}
          />
          <CustomButton
            text="PACIENTE AUSENTE"
            onPress={handleSubmit(paciente_ausente)}
            disabled={isHcdLoading}
            type="SECONDARY"
          />
        </>
      )}
    </Container>
  );
}
