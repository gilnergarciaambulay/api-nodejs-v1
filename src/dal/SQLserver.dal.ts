import * as sql from 'mssql'
import { instanceOfNodeError } from '../utilities/error.utilities';
import { configSqlServer } from './Config.dal'

class SQLServerNode {

    constructor() {
        console.log("Iniciando la base de datos....")
        //this.asyMtdCrearConexion()
    }

    /**
     * Crea la conexion a la base de datos. 
     * @date 23/09/2021
     */
    public asyM_ConnexionSQL = async () => {
        try {
            const objLConexion = await new sql.ConnectionPool(configSqlServer).connect()
            return objLConexion
        } catch (error: any) {
            if (instanceOfNodeError(error, Error)) {
                throw new sql.ConnectionError("Error de conexion!");
            }
        }
    }

}

export default new SQLServerNode();