import Odoo from "react-native-odoo-promise-based";

export default class OdooDataManager {
  static myInstance = null;
  odoo_conexion = null;
  /**
   * @returns {CommonDataManager}
   */
  static getInstance() {
    if (OdooDataManager.myInstance == null) {
      OdooDataManager.myInstance = new OdooDataManager();
    }

    return this.myInstance;
  }

  async logear(usuario, password) {
    this.setDatosConexion(usuario, password);
    var response = await this.odoo_conexion.connect();
    return response;
  }

  get_odoo_conector() {
    if (this.odoo_conexion == null) {
      this.setDatosConexion("testapp@mail.com", "TestApp123456");
    }
    return this.odoo_conexion;
  }

  setDatosConexion(_username, _password) {
    this.odoo_conexion = new Odoo({
      host: "amce.anacsoft.com",
      database: "productivo_amce",
      port: 80 /* Defaults to 80 if not specified */,
      username: _username /* Optional  if using a stored session_id */,
      password: _password /* Optional if using a stored session_id */,
      protocol: "http" /* Defaults to http */,
    });
  }

  clear() {
    if (this.odoo_conexion == null) return;
    this.odoo_conexion = null;
  }
}
