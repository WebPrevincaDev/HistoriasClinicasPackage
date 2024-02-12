import { obtener_hora } from "../../helpers/common";
import CustomInput from "../../components/CustomInput";
import Form from "../../components/Form";

function FormSignosVitales({ control }) {
  return (
    <Form title="Signos vitales">
      <CustomInput
        name="signosVitales.hora"
        label="Hora"
        placeholder="Hora"
        control={control}
        defaultValue={obtener_hora()}
      />
      <CustomInput
        name="signosVitales.tas"
        label="TAS"
        placeholder="TAS"
        control={control}
        rules={{ required: true }}
        keyboardType="number-pad"
      />
      <CustomInput
        name="signosVitales.tad"
        label="TAD"
        placeholder="TAD"
        control={control}
        rules={{ required: true }}
        keyboardType="number-pad"
      />
      <CustomInput
        name="signosVitales.temperatura"
        label="Temperatura"
        placeholder="Temperatura"
        control={control}
        rules={{ required: true }}
        keyboardType="number-pad"
      />
      <CustomInput
        name="signosVitales.frres"
        label="FR. RES"
        placeholder="FR. RES"
        control={control}
        rules={{ required: true }}
        keyboardType="number-pad"
      />
      <CustomInput
        name="signosVitales.fc"
        label="FC"
        placeholder="FC"
        control={control}
        rules={{ required: true }}
        keyboardType="number-pad"
      />
      <CustomInput
        name="signosVitales.llcap"
        label="LL. CAP"
        placeholder="LL. CAP"
        control={control}
      />
      <CustomInput
        name="signosVitales.glucemia"
        label="Glucemia"
        placeholder="Glucemia"
        control={control}
        keyboardType="number-pad"
      />
      <CustomInput
        name="signosVitales.sat_oxigeno"
        label="Sat. Oxígeno"
        placeholder="Sat. Oxígeno"
        control={control}
        keyboardType="number-pad"
      />
    </Form>
  );
}

export default FormSignosVitales;
