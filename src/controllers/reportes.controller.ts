import { Request, Response } from "express";
import * as sql from 'mssql';
import obPt_SQLServerNode from '../dal/SQLserver.dal';
import { instanceOfNodeError } from "../utilities/error.utilities";

class ReportesController{
    
    constructor() {
        //console.log("Iniciando el controlador...")
    }

    /**
     * Muestra los almacenes que estan relacionado a una ubicacion
     * @param {Request} req Request del cliente
     * @param {Response} res  Response del servidor
     * @date 23/11/2022
    */
    public asyMtd_GetEficienciaLineaCostura = async (req: Request, res: Response) =>    { 
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()
                .execute(`WEB_ITP_GET_ING_COSTURA_EFICIENCIA_LINEA`)

            res.json({
                message: "success",
                confirmacion: true,
                resultado: objL_query.recordset
            })
        }catch (error: any) {
            if (instanceOfNodeError(error, sql.RequestError)) {
                return res.status(201).json({
                    message: error.originalError?.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, sql.ConnectionError)) {
                return res.status(202).json({
                    message: error.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, Error)) {
                return res.status(203).json({
                    message: error.message,
                    confirmacion: false
                })
            }
        }
    }
    public asyMtd_GetSemanaAnio = async (req: Request, res: Response) =>    { 
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()
                .execute(`WEB_ITP_GET_ING_SEMANAS_ANIO`)

            res.json({
                message: "success",
                confirmacion: true,
                resultado: objL_query.recordset
            })
        }catch (error: any) {
            if (instanceOfNodeError(error, sql.RequestError)) {
                return res.status(201).json({
                    message: error.originalError?.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, sql.ConnectionError)) {
                return res.status(202).json({
                    message: error.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, Error)) {
                return res.status(203).json({
                    message: error.message,
                    confirmacion: false
                })
            }
        }
    }
    public asygetCosturaEficienciaLinea = async (req: Request, res: Response) =>    { 
        const { FInicio } = req.query        
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()
                .input('FCHINI' , sql.VarChar, FInicio)           
                .execute(`WEB_ITP_GET_ING_COSTURA_EFICIENCIA_LINEA_FILTRO`)

            res.json({
                message: "success",
                confirmacion: true,
                resultado: objL_query.recordset
            })
        }catch (error: any) {
            if (instanceOfNodeError(error, sql.RequestError)) {
                return res.status(201).json({
                    message: error.originalError?.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, sql.ConnectionError)) {
                return res.status(202).json({
                    message: error.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, Error)) {
                return res.status(203).json({
                    message: error.message,
                    confirmacion: false
                })
            }
        }
    }
    public asyMtd_GetLineasByAreas = async (req: Request, res: Response) =>    { 
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()
                .execute(`WEB_ITP_GET_ING_LISTALINEASBYAREAS`)

            res.json({
                message: "success",
                confirmacion: true,
                resultado: objL_query.recordset
            })
        }catch (error: any) {
            if (instanceOfNodeError(error, sql.RequestError)) {
                return res.status(201).json({
                    message: error.originalError?.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, sql.ConnectionError)) {
                return res.status(202).json({
                    message: error.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, Error)) {
                return res.status(203).json({
                    message: error.message,
                    confirmacion: false
                })
            }
        }
    }
    public asygetCosturaEficienciaIndividualBihodiariaCostura = async (req: Request, res: Response) =>    { 
        const { Fecha,Linea } = req.query        
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()
                .input('PFECHA' , sql.VarChar, Fecha)        
                .input('PINTLIN' , sql.VarChar, Linea)        
                .execute(`WEB_ITP_GET_ING_COSTURA_EFICIENCIA_INDIVIDUAL_BIHODIARIA`)

            res.json({
                message: "success",
                confirmacion: true,
                resultado: objL_query.recordset
            })
        }catch (error: any) {
            if (instanceOfNodeError(error, sql.RequestError)) {
                return res.status(201).json({
                    message: error.originalError?.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, sql.ConnectionError)) {
                return res.status(202).json({
                    message: error.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, Error)) {
                return res.status(203).json({
                    message: error.message,
                    confirmacion: false
                })
            }
        }
    }
    public asygetCosturaEficienciaIndividualDiaria = async (req: Request, res: Response) =>    { 
        const { Anio,Semana,Linea } = req.query        
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()
                .input('NVANIO' , sql.VarChar, Anio)        
                .input('NVSEM' , sql.VarChar, Semana)        
                .input('INLINEA' , sql.VarChar, Linea)        
                .execute(`WEB_ITP_GET_ING_COSTURA_EFICIENCIA_INDIVIDUAL_DIARIA`)

            res.json({
                message: "success",
                confirmacion: true,
                resultado: objL_query.recordset
            })
        }catch (error: any) {
            if (instanceOfNodeError(error, sql.RequestError)) {
                return res.status(201).json({
                    message: error.originalError?.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, sql.ConnectionError)) {
                return res.status(202).json({
                    message: error.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, Error)) {
                return res.status(203).json({
                    message: error.message,
                    confirmacion: false
                })
            }
        }
    }    
    public asygetCosturaEficienciaLineaAnioFiltro = async (req: Request, res: Response) =>    { 
        const { anio,valor1, valor2, ops } = req.query        
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()  
                .input('PANIO' , sql.VarChar, anio)        
                .input('PVALOR1' , sql.VarChar, valor1)             
                .input('PVALOR2' , sql.VarChar, valor2)             
                .input('POPCION' , sql.VarChar, ops)             
                .execute(`ITP_GET_ING_KPI_COSTURA_EFICIENCIA_LINEA_ANIO`)

            res.json({
                message: "success",
                confirmacion: true,
                resultado: objL_query.recordset
            })
        }catch (error: any) {
            if (instanceOfNodeError(error, sql.RequestError)) {
                return res.status(201).json({
                    message: error.originalError?.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, sql.ConnectionError)) {
                return res.status(202).json({
                    message: error.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, Error)) {
                return res.status(203).json({
                    message: error.message,
                    confirmacion: false
                })
            }
        }
    }  
    public asygetCosturaEficienciaLineaDiaria = async (req: Request, res: Response) =>    { 
        const { fechaInicio,fechaFin } = req.query        
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()  
                .input('PFECINI' , sql.VarChar, fechaInicio)        
                .input('PFECFIN' , sql.VarChar, fechaFin)             
                .execute(`WEB_ITP_GET_ING_COSTURA_EFICIENCIA_LINEA_DIA`)

            res.json({
                message: "success",
                confirmacion: true,
                resultado: objL_query.recordset
            })
        }catch (error: any) {
            if (instanceOfNodeError(error, sql.RequestError)) {
                return res.status(201).json({
                    message: error.originalError?.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, sql.ConnectionError)) {
                return res.status(202).json({
                    message: error.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, Error)) {
                return res.status(203).json({
                    message: error.message,
                    confirmacion: false
                })
            }
        }
    }    
    public asygetCosturaEficienciaIndividualSemanal= async (req: Request, res: Response) =>    { 
        const { anio, semInicio, semFin, ops } = req.query        
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()  
                .input('ANIO' , sql.VarChar, anio)        
                .input('SEMINI' , sql.VarChar, semInicio)             
                .input('SEMFIN' , sql.VarChar, semFin)             
                .input('OPS' , sql.VarChar, ops)             
                .execute(`WEB_ITP_GET_ING_COSTURA_EFICIENCIA_INDIVIDUAL_SEMANAL_RANGO`)

            res.json({
                message: "success",
                confirmacion: true,
                resultado: objL_query.recordset
            })
        }catch (error: any) {
            if (instanceOfNodeError(error, sql.RequestError)) {
                return res.status(201).json({
                    message: error.originalError?.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, sql.ConnectionError)) {
                return res.status(202).json({
                    message: error.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, Error)) {
                return res.status(203).json({
                    message: error.message,
                    confirmacion: false
                })
            }
        }
    }
    public asygetCorteEficienciaCortes= async (req: Request, res: Response) =>    { 
        const { fechaInicio, fechaFin } = req.query        
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()  
                .input('PFINI' , sql.VarChar, fechaInicio)        
                .input('PFFIN' , sql.VarChar, fechaFin)                                   
                .execute(`ITP_CORTE_INDICADORES_EFICIENCIA`)

            res.json({
                message: "success",
                confirmacion: true,
                resultado: objL_query.recordset
            })
        }catch (error: any) {
            if (instanceOfNodeError(error, sql.RequestError)) {
                return res.status(201).json({
                    message: error.originalError?.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, sql.ConnectionError)) {
                return res.status(202).json({
                    message: error.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, Error)) {
                return res.status(203).json({
                    message: error.message,
                    confirmacion: false
                })
            }
        }
    } 
    public asygetAcabadoAvanceEncajados= async (req: Request, res: Response) =>    { 
        const { fechaInicio, idhorario } = req.query        
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()  
                .input('PFECINI' , sql.VarChar, fechaInicio)                                                                              
                .input('PHORARIO' , sql.VarChar, idhorario)                                                                              
                .execute(`ITP_GET_INDICADORES_ACABADOS_ENCAJADO`)

            res.json({
                message: "success",
                confirmacion: true,
                resultado: objL_query.recordset
            })
        }catch (error: any) {
            if (instanceOfNodeError(error, sql.RequestError)) {
                return res.status(201).json({
                    message: error.originalError?.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, sql.ConnectionError)) {
                return res.status(202).json({
                    message: error.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, Error)) {
                return res.status(203).json({
                    message: error.message,
                    confirmacion: false
                })
            }
        }
    }
    public asygetAcabadoAvanceVaporizado= async (req: Request, res: Response) =>    { 
        const { fechaInicio, idhorario  } = req.query        
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()  
                .input('PFECINI' , sql.VarChar, fechaInicio)  
                .input('PHORARIO' , sql.VarChar, idhorario)                                                                             
                .execute(`ITP_GET_INDICADORES_ACABADOS_VAPARIZADO`)

            res.json({
                message: "success",
                confirmacion: true,
                resultado: objL_query.recordset
            })
        }catch (error: any) {
            if (instanceOfNodeError(error, sql.RequestError)) {
                return res.status(201).json({
                    message: error.originalError?.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, sql.ConnectionError)) {
                return res.status(202).json({
                    message: error.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, Error)) {
                return res.status(203).json({
                    message: error.message,
                    confirmacion: false
                })
            }
        }
    }
    public asygetHorario= async (req: Request, res: Response) =>    { 
        const { codarea } = req.query        
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()  
                .input('CODAREA' , sql.VarChar, codarea)                                                                              
                .execute(`ITP_Get_RH_ListadoHorarios`)

            res.json({
                message: "success",
                confirmacion: true,
                resultado: objL_query.recordset
            })
        }catch (error: any) {
            if (instanceOfNodeError(error, sql.RequestError)) {
                return res.status(201).json({
                    message: error.originalError?.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, sql.ConnectionError)) {
                return res.status(202).json({
                    message: error.message,
                    confirmacion: false
                })
            } else if (instanceOfNodeError(error, Error)) {
                return res.status(203).json({
                    message: error.message,
                    confirmacion: false
                })
            }
        }
    }                                                                     
}

export default new ReportesController()    