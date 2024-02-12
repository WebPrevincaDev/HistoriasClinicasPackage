export default class CreatePdfService {
  create_pdf({ hcd, user, hcdConfig }) {
    const result = `
      ${this.img()}
      <h3>
        <p>HISTORIA CLÍNICA PREHOSPITALARIA</p>
        <p>EMERGENCIA MÉDICA</p>
      </h3>
      ${this.config({ hcd, user, hcdConfig })}
      ${this.campo(
        "MOTIVO DE LLAMADO",
        hcd.llamadaMotivo + " - " + hcd.llamadaColor
      )}    
      ${this.campo("UBICACIÓN", hcd.ubicacion_atencion)}
      ${this.datosPaciente(hcd)}
      ${
        hcd.nombre_medico_derivante
          ? `${this.campo(
              "MÉDICO DERIVANTE",
              `Instituto : ${hcd.instituto} 
              <br /> Médico: ${hcd.nombre_medico_derivante}
              <br /> Mat: ${hcd.matricula_medico_derivante}
              <br/>`
            )}
            ${this.imgFirma(hcd.firma_med_derivante.uri)}`
          : ""
      }
      ${this.campo(
        "FIRMA PACIENTE O ACOMPAÑANTE",
        `${this.imgFirma(hcd.firma_pac_acompanante.uri)}`
      )}
      ${this.campo("ACLARACIÓN", hcd.aclaracion_pac_acompanante)}
      ${this.campo("DNI: ", hcd.dni_pac_acompanante)}
      ${this.copago(hcd.abona_copago)}
      ${this.pie()}`;

    return result;
  }

  img() {
    return `
      <div style="display: flex;">
        <img height="60" width="auto" src="http://amce.anacsoft.com/asw_amce/static/src/img/amce-siempre.jpg" alt="AMCE" />
        <img height="60" width="auto" src="http://amce.anacsoft.com/asw_amce/static/src/img/siemLogo.png" alt="SIEM" />
      </div>`;
  }

  imgFirma(firma) {
    return `<img style="margin:5px;" src="${firma}" alt="Firma" height="110" width="110"><br>`;
  }

  datosPaciente(json) {
    return `
      <h4>DATOS DEL PACIENTE</h4>
      ${this.campo("NOMBRE", json.pac_nombre)}
      ${this.campo("APELLIDO", json.pac_apellido)}
      ${this.campo("EDAD", json.pac_edad)}
      ${this.campo("DNI", json.pac_dni)}
      ${this.campo("COBERTURA", json.pac_cobertura)}
      ${this.campo("PLAN", json.pac_plan)}
      ${this.campo("NRO SOCIO", json.pac_nro_socio)}
      ${this.campo("LOCALIDAD", json.pac_localidad)}
      ${this.campo("CALLE", json.pac_calle)}
      ${this.campo("INTERSECCIÓN", json.pac_interseccion)}
      ${this.campo("NRO", json.pac_nro)}
      ${this.campo("PISO", json.pac_piso)}
      ${this.campo("DTO", json.pac_dto)}
      ${this.campo("ANTECEDENTES", json.antecedentes)}
      ${this.campo("PIEL Y MUCOSA", json.piel_mucosa)}
      ${this.campo("EDEMAS", json.edemas)}
      ${this.campo("CABEZA Y CUELLO", json.cyc)}
      ${this.campo("SISTEMA CARDIOVASCULAR", json.cardio)}
      ${this.campo("EXAMEN NEUROLÓGICO", json.neuro)}
      ${this.campo("ELECTROCARDIOGRAMA", json.ecg_desc)}
      ${this.campo("SISTEMA OSEOARTROMUSCULAR", json.sist_oseoart_muscular)}
      ${this.campo("ABDOMEN", json.abdomen)}
      ${this.campo("UROGENITAL", json.urogen)}
      ${this.campo("GCO", json.gco)}
      ${this.campo("PSIQUIÁTRICO", json.psiquiatrico)}
      ${this.campo("SISTEMA RESPIRATORIO", json.ap_respiratorio)}
      ${this.campo("DESENLACE", json.desenlace)}
      ${this.campo("EVOLUCIÓN", json.evolucion)}
      ${this.campo("AL LLEGAR", json.alLlegar)}
      ${this.campo("HOSPITAL", json.instituto)}
      ${this.campo("MECANISMO", json.mecanismo)}
      ${this.campo("MEDICAMENTOS", json.medicamentos)}
      ${this.campo("PROCEDIMIENTO", json.procedimiento)}
      ${this.campo("DIAGNÓSTICO", json.diagnostico)}
      ${this.campo("EPICRISIS", json.epicrisis)}
      ${this.campo("TIEMPO EVOLUCIÓN", json.dias + json.horas + json.minutos)}
      ${this.signosVitales("SIGNOS VITALES", json.medicionesSignosVitales)}
      ${this.score_glasgow("SCORE GLASGOW", json.medicionesScoreGlasgow)}
      ${this.traumas("TRAUMAS", json.historia_traumas)}`;
  }

  traumas(titulo, mediciones) {
    if (!mediciones) return "";

    let result = `<span style='margin:5px'><b>${titulo}</b></span><br>`;

    if (mediciones.ABDOMEN) {
      result += `<span>ADBOMEN : ${mediciones.ADBOMEN}</span><br>`;
    }
    if (mediciones.CARA) {
      result += `<span>CARA : ${mediciones.CARA}</span><br>`;
    }
    if (mediciones.CRANEO) {
      result += `<span>CRANEO : ${mediciones.CRANEO}</span><br>`;
    }
    if (mediciones.CUELLO) {
      result += `<span>CUELLO : ${mediciones.CUELLO}</span><br>`;
    }
    if (mediciones.GENITALES) {
      result += `<span>GENITALES : ${mediciones.GENITALES}</span><br>`;
    }
    if (mediciones.MECANISMO) {
      result += `<span>MECANISMO : ${mediciones.MECANISMO}</span><br>`;
    }
    if (mediciones["MIEMBRO INF DERECHO"]) {
      result += `<span>MIEMBRO INF DERECHO : ${mediciones["MIEMBRO INF DERECHO"]}</span><br>`;
    }
    if (mediciones["MIEMBRO INF IZQUIERDO"]) {
      result += `<span>MIEMBRO INF IZQUIERDO : ${mediciones["MIEMBRO INF IZQUIERDO"]}</span><br>`;
    }
    if (mediciones["MIEMBRO SUP DERECHO"]) {
      result += `<span>MIEMBRO SUP DERECHO : ${mediciones["MIEMBRO SUP DERECHO"]}</span><br>`;
    }
    if (mediciones["MIEMBRO SUP IZQUIERDO"]) {
      result += `<span>MIEMBRO SUP IZQUIERDO : ${mediciones["MIEMBRO SUP IZQUIERDO"]}</span><br>`;
    }
    if (mediciones.PELVIS) {
      result += `<span>PELVIS : ${mediciones.PELVIS}</span><br>`;
    }
    if (mediciones.PERINE) {
      result += `<span>PERINE : ${mediciones.PERINE}</span><br>`;
    }
    if (mediciones.RAQUIS) {
      result += `<span>RAQUIS : ${mediciones.RAQUIS}</span><br>`;
    }
    if (mediciones.TORAX) {
      result += `<span>TORAX : ${mediciones.TORAX}</span><br>`;
    }

    result += `<br>`;
    return result;
  }

  score_glasgow(titulo, mediciones) {
    return !mediciones
      ? ""
      : `<span style='margin:5px'><b>${titulo}</b></span><br>
          ${mediciones.reduce(
            (previousValue, currentValue) =>
              previousValue +
              `<table>
                <span style='margin:5px'>HORA: ${currentValue.hora}</span><br>
                <span style='margin:5px'>OCULAR: ${currentValue.ocular}</span><br>
                <span style='margin:5px'>MOTORA: ${currentValue.motora}</span><br>
                <span style='margin:5px'>VERBAL: ${currentValue.verbal}</span><br>
                <span style='margin:5px'>TOTAL: ${currentValue.total}</span><br>
              </table>
              <br/>`,
            ""
          )}`;
  }

  signosVitales(titulo, mediciones) {
    return !mediciones
      ? ""
      : `<span style='margin:5px'><b>${titulo}</b></span><br>
        ${mediciones.reduce(
          (previousValue, currentValue) =>
            previousValue +
            `<table>
              <span style='margin:5px'>HORA: ${currentValue.hora}</span><br>
              <span style='margin:5px'>TAS: ${currentValue.tas}</span><br>
              <span style='margin:5px'>TAD: ${currentValue.tad}</span><br>
              <span style='margin:5px'>TEMPERATURA: ${
                currentValue.temperatura
              }</span><br>
              <span style='margin:5px'>FREC. RES: ${
                currentValue.frres
              }</span><br>
              <span style='margin:5px'>FC: ${currentValue.fc}</span><br>
              <span style='margin:5px'>LL. CAP: ${
                currentValue.llcap || "-"
              }</span><br>
              <span style='margin:5px'>Glucemia: ${
                currentValue.glucemia || "-"
              }</span><br>
              <span style='margin:5px'>Sat. Oxígeno: ${
                currentValue.sat_oxigeno || "-"
              }</span><br>
            </table><br/>`,
          ""
        )}`;
  }

  pie() {
    return `
      <h4><p>AMCE S.A.</p></h4>
      <p>Av. San Martín 2098 (2200) <br> Tel: 03476 - 422422</p>`;
  }

  config({ hcd, user, hcdConfig }) {
    const fecha = new Date(hcd.fecha);
    return `
      <table>
        ${this.campo(
          "FECHA",
          `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`
        )}
        ${this.campo("MÓVIL", hcdConfig.movil)}     
        ${this.campo("CHOFER", hcdConfig.chofer)}
        ${this.campo("ENFERMERO", hcdConfig.enfermero)}
        ${this.campo("MÉDICO", `${user.nombre}<br /> Mat: ${user.matricula}`)}
        ${this.imgFirma(user.firma.uri)}            
      </table>`;
  }

  campo(titulo, valor) {
    if (!valor) return "";
    return `
      <span style='margin:5px'><b>${titulo}</b></span><br>
      <span style='margin:5px'>${valor}</span><br>`;
  }

  copago(paid) {
    if (paid) return "<span style='margin:5px'><b>SE ABONÓ COPAGO</b></span>";
    return "<span style='margin:5px'><b>NO SE ABONÓ COPAGO</b></span>";
  }
}
