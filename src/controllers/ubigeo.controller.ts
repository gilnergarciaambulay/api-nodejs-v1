import { Request, Response } from 'express'
import obPt_SQLServerNode from './../dal/SQLserver.dal'
import * as sql from 'mssql'
import { instanceOfNodeError } from '../utilities/error.utilities'
import { Console } from 'console'
import dns from 'dns/promises';
import axios from "axios";
class UbigeoController {

    constructor() {
        //console.log("Iniciando el controlador...")
    }
    public asyMtd_GetDepartamento= async (req: Request, res: Response) => {
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()
                .query(`ERP_GET_UBIGEO_READ_DEPARTMENTS`)
            res.json({
                message: "Lista de departamentos",
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

    public asyMtd_GetProvincia = async (req: Request, res: Response) => {
        const { codDepartamento } = req.query
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()
                .input('VCH_IN_DEPARTMENT', sql.VarChar, codDepartamento)
                .execute(`ERP_GET_UBIGEO_READ_PROVINCES`)
            res.json({
                message: "Lista de provincias",
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

    public asyMtd_GetDistrito = async (req: Request, res: Response) => {
        const { codProvincia } = req.query
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()
                .input('VCH_IN_PROVINCE', sql.VarChar, codProvincia)
                .execute(`ERP_GET_UBIGEO_READ_DISTRICTS`)
            res.json({
                message: "Lista de provincias",
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

}
export default new UbigeoController()