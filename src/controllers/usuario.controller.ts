import { Request, Response } from "express";
import obPt_SQLServerNode from '../dal/SQLserver.dal';
import * as sql from 'mssql'
import { instanceOfNodeError } from "../utilities/error.utilities";
import jwt from 'jsonwebtoken';

class UsuarioController {

    constructor() {
        //console.log("Iniciando el controlador...")
    }

    /**
     * Inicio sesion del usuario
     * @param {Request} req Request del cliente
     * @param {Response} res  Response del servidor
     * @date 23/09/2021
    */
    public asyMtd_IniciarSesion = async (req: Request, res: Response) => {
   /*      const { usuario, contrasenia } = req.query; */
        const { usuario, contrasenia  } = req.body;
    
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL();
            const objL_query = await objL_Conn!
                .request()
                .input('LoginUsuario', sql.NVarChar, usuario)
                .input('ClaveAcceso', sql.NVarChar, contrasenia)
                .execute(`ERP_GET_LOGIN_READ_GUSUARIOS`);
    
            const resultado = objL_query.recordset[0];
    
            if (!resultado) {
                return res.status(401).json({
                    message: "Credenciales inválidas",
                    confirmacion: false
                });
            }
    
            // Aquí generamos el token
            const payload = {
                id: resultado.IdUsuario,       // Asegúrate de que este campo exista
                usuario: resultado.Usuario,    // Igualmente
                rol: resultado.Rol             // Puedes agregar más datos si deseas
            };            
    
            // 🔐 Aquí usamos la misma clave definida en el .env
            const token_app = jwt.sign(payload, process.env.TK_LLAVE!, {
                expiresIn: '1h'/* '2h' */ // o el tiempo que necesites
            });
    
            res.json({
                message: "¡Bienvenido!",
                token_app,
                resultado,
                confirmacion: true
            });
    
        } catch (error: any) {
            return res.status(500).json({
                message: error.message,
                confirmacion: false
            });
        }
    }; 

    public asyMtd_IniciarSesion1 = async (req: Request, res: Response) => {
        const { usuario, contrasenia } = req.query
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()
                .input('LoginUsuario', sql.NVarChar, usuario)
                .input('ClaveAcceso', sql.NVarChar, contrasenia)
                .execute(`APP_INICIAR_SESSION`);

            res.json({
                message: "¡Bienvenido!",
                resultado: objL_query.recordset,
                confirmacion: true
            })

        } catch (error: any) {
            if (instanceOfNodeError(error, sql.RequestError)) {
                return res.status(200).json({
                    message: error.originalError?.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, sql.ConnectionError)) {
                return res.status(200).json({
                    message: error.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, Error)) {
                return res.status(200).json({
                    message: error.message,
                    confirmacion: false
                })
            }
        }
    }

    /**
     * Genera el menu del usuario de acuerdo a los permisos establecidos en el ITP
     * @param {Request} req Request del cliente
     * @param {Response} res  Response del servidor
     * @date 23/09/2021
    */
    public asyMtd_GenerarMenuUsuario = async (req: Request, res: Response) => {
        const { APLICACION, USUARIO } = req.query
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()
                .input('APLICACION', sql.Char, APLICACION)
                .input('USUARIO', sql.VarChar, USUARIO)
                .execute(`ITP_LISTAR_MENU_USUARIO`);
            //console.log(objL_query)
            res.json({
                message: "data success",
                confirmacion: true,
                resultado: objL_query.recordset
            })
        } catch (error: any) {
            if (instanceOfNodeError(error, sql.RequestError)) {
                return res.status(200).json({
                    message: error.originalError?.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, sql.ConnectionError)) {
                return res.status(200).json({
                    message: error.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, Error)) {
                return res.status(200).json({
                    message: error.message,
                    confirmacion: false
                })
            }
        }
    }

    /**
     * Lista la información de los usuarios según el grupo de alerta
     * @param {Request} req Request del cliente
     * @param {Response} res  Response del servidor
     * @date 23/09/2021
    */
    public asyMtd_DatosDeLosUsuarioGruposAlerta = async (req: Request, res: Response) => {
        const { IDPANICO } = req.query
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()
                .input('IDPANICO', sql.Char, IDPANICO)
                .execute(`ITP_LISTAR_GRUPO_ALERTAS`);

            let objL_resultado = objL_query.recordset

            if (objL_resultado.length <= 0) {
                throw new Error('No existe datos para este IDPANICO!')
            }

            res.json({
                message: "¡Alerta Enviada!",
                confirmacion: true,
                resultado: objL_query.recordset
            })
        } catch (error: any) {
            if (instanceOfNodeError(error, sql.RequestError)) {
                return res.status(200).json({
                    message: error.originalError?.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, sql.ConnectionError)) {
                return res.status(200).json({
                    message: error.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, Error)) {
                return res.status(200).json({
                    message: error.message,
                    confirmacion: false
                })
            }
        }
    }

    /**
     * Cambio de contraseña en el aplicativo app ITP
     * @param {Request} req Request del cliente
     * @param {Response} res  Response del servidor
     * @date 19/10/2021
    */
    public asyMtd_CambioDeContrasenia = async (req: Request, res: Response) => {
        const { usuario, clave, dni, WksMod } = req.body
        console.log(req.body)
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()
                .input('usuario', sql.VarChar, usuario)
                .input('dni', sql.Char, dni)
                .input('WksMod', sql.Char, WksMod)
                .input('clave', sql.VarChar, clave) 
                .execute(`APP_CAMBIAR_CONTRASENIA`);

            res.json({
                message: "data success",
                confirmacion: true
            })
        } catch (error: any) {
            if (instanceOfNodeError(error, sql.RequestError)) {
                return res.status(200).json({
                    message: error.originalError?.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, sql.ConnectionError)) {
                return res.status(200).json({
                    message: error.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, Error)) {
                return res.status(200).json({
                    message: error.message,
                    confirmacion: false
                })
            }
        }
    }

}

export default new UsuarioController()