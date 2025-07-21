import OdooDataManager from "./OdooDataManager";
import * as Sentry from "@sentry/react-native";

const connectionErrMsg =
  "Error de Conexión.\nEn estos momentos no podemos conectarnos con el servidor, por favor vuelva a intentarlo más tarde.\nDisculpe las molestias.";
const loginErrMsg =
  "Error de Inicio de Sesión.\nUsuario o contraseña incorrectos.\nPor favor revise los datos y vuelva a intentarlo.";
const connectionRejectedErrMsg =
  "Error de Conexión.\nEn estos momentos no es posible conectarse con el servidor.";

export default class OdooServer {
  static getOdooInstance() {
    let odoodm = OdooDataManager.getInstance();
    let odoo = odoodm.get_odoo_conector();

    return odoo;
  }

  static async search(_domain, _fields, tableName, context = {}, _order = "") {
    try {
      var odoo = this.getOdooInstance();
      var response = await odoo.connect();
      if (response.success && response.data["uid"] != false) {
        const params = {
          domain: _domain,
          fields: _fields,
          order: _order,
        };
        let registro = await odoo.search_read(tableName, params, context);
        return registro.data;
      } else {
        console.log("Error al hacer un search:", response.error);
        Sentry.captureException(new Error("Error al hacer un search:", response.error));
        if (response.error != null) {
          throw new Error(connectionErrMsg);
        } else {
          throw new Error(loginErrMsg);
        }
      }
    } catch (e) {
      Sentry.captureException(e)
      throw new Error(connectionRejectedErrMsg);
    }
  }

  static async rpc(endpoint, params) {
    try {
      var odoo = this.getOdooInstance();
      var response = await odoo.connect();
      if (response.success && response.data["uid"] != false) {
        let registro = await odoo.rpc_call(endpoint, params);
        return registro.data;
      } else {
        Sentry.captureException("Error al hacer un rpc_call:", response.error);
        if (response.error != null) {
          throw new Error(connectionErrMsg);
        } else {
          throw new Error(loginErrMsg);
        }
      }
    } catch (e) {
      Sentry.captureException(e)
      throw new Error(connectionRejectedErrMsg);
    }
  }

  static async create(tableName, params, context = {}) {
    try {
      var odoo = this.getOdooInstance();
      var response = await odoo.connect();
      if (response.success && response.data["uid"] != false) {
        let registro = await odoo.create(tableName, params, context);
        console.log(registro);
        return registro.data;
      } else {
        Sentry.captureException("Error al hacer un create:", response.error);
        if (response.error != null) {
          throw new Error(connectionErrMsg);
        } else {
          throw new Error(loginErrMsg);
        }
      }
    } catch (e) {
      Sentry.captureException(e)
      throw new Error(connectionRejectedErrMsg);
    }
  }

  static async update(_datos, id, modelo) {
    try {
      let odoo = this.getOdooInstance();
      var response = await odoo.connect();
      if (response.success && response.data["uid"] != false) {
        response = await odoo.update(modelo, [id], _datos, {});
        console.info("Response update:", response);
        return response.success;
      } else {
        Sentry.captureException("Error al hacer un update:", response.error);
        if (response.error != null) {
          throw new Error(connectionErrMsg);
        } else {
          throw new Error(loginErrMsg);
        }
      }
    } catch (e) {
      Sentry.captureException(e)
      throw new Error(connectionRejectedErrMsg);
    }
  }

  static async delete(modelo, id) {
    try {
      let odoo = this.getOdooInstance();
      var response = await odoo.connect();
      if (response.success && response.data["uid"] != false) {
        response = await odoo.delete(modelo, [id], {});
        return response.success;
      } else {
        Sentry.captureException("Error al hacer un delete:", response.error);
        if (response.error != null) {
          throw new Error(connectionErrMsg);
        } else {
          throw new Error(loginErrMsg);
        }
      }
    } catch (e) {
      Sentry.captureException(e)
      throw new Error(connectionRejectedErrMsg);
    }
  }
}
