import { sincronizar } from "./sincronizar";

const profesionales = {
  tabla: "asw.profesionales",
  campos: ["name", "pro_grupo", "pro_matricula", "pro_password", "email"],
};

const usuariosApp = {
  tabla: "asw.usuario_app",
  campos: ["app_nombre", "app_matricula", "app_mail", "app_password"],
};

const info = [
  {
    tabla: "asw.piel_mucosa",
    campos: ["piel_mucosa_nombre"],
  },
  {
    tabla: "asw.edema",
    campos: ["edema_nombre"],
  },
  {
    tabla: "asw.cyc",
    campos: ["cyc_nombre"],
  },
  {
    tabla: "asw.neuro_estado_mental",
    campos: ["nombre"],
  },
  {
    tabla: "asw.neuro",
    campos: ["neuro_nombre", "opcion_doble"],
  },
  {
    tabla: "asw.abdomen",
    campos: ["abdomen_nombre"],
  },
  {
    tabla: "asw.urogen",
    campos: ["urogen_nombre"],
  },
  {
    tabla: "asw.gco",
    campos: ["gco_nombre"],
  },
  {
    tabla: "asw.psi",
    campos: ["psi_nombre"],
  },
  {
    tabla: "asw.ap_respiratorio",
    campos: ["resp_nombre", "opcion_doble"],
  },
  {
    tabla: "asw.mec",
    campos: ["mec_nombre"],
  },
  {
    tabla: "asw.cardio_pulso",
    campos: ["nombre"],
  },
  {
    tabla: "asw.cardio_soplo",
    campos: ["nombre"],
  },
  {
    tabla: "asw.cardio",
    campos: ["cardio_nombre"],
  },
  {
    tabla: "asw.diagnos",
    campos: ["diagnos_nombre", "diagnos_codigo"],
  },
  {
    tabla: "asw.movil",
    campos: ["movil_nombre"],
  },
  {
    tabla: "asw.des",
    campos: ["des_nombre"],
  },
  {
    tabla: "asw.evol",
    campos: ["evol_nombre"],
  },
  {
    tabla: "asw.clas_llam",
    campos: ["clas_llam_nombre"],
  },
  {
    tabla: "asw.al_llegar",
    campos: ["al_llegar_nombre"],
  },
  {
    tabla: "asw.antecedente",
    campos: ["antecedente_nombre"],
  },
  {
    tabla: "asw.paciente",
    campos: [],
  },
  {
    tabla: "asw.cobertura",
    campos: ["cob_nombre"],
  },
  {
    tabla: "asw.plan",
    campos: ["plan_nombre"],
  },
  {
    tabla: "asw.localidad",
    campos: ["descripcion"],
  },
  {
    tabla: "asw.mla",
    campos: ["mla_nombre", "mla_codigo", "mla_color"],
  },
  {
    tabla: "asw.trauma_lugar",
    campos: ["trauma_lugar_nombre"],
  },
  {
    tabla: "asw.trauma_tipo",
    campos: ["trauma_tipo_nombre"],
  },
  {
    tabla: "asw.institucion",
    campos: ["ins_nombre"],
  },
  {
    tabla: "asw.medicamentos",
    campos: ["medicamentos_nombre"],
  },
];

export const sincronizarAll = async () => {
  console.log("arranco sincronizarAll");
  await sincronizar(profesionales);
  await sincronizar(usuariosApp);
  for (let i = 0; i < info.length; i++) await sincronizar(info[i]);
  console.log("termino sincronizarAll");
};
