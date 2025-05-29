import { Request, Response } from 'express'
import obPt_SQLServerNode from './../dal/SQLserver.dal'
import * as sql from 'mssql'
import { instanceOfNodeError } from '../utilities/error.utilities'
import { Console } from 'console'
import dns from 'dns/promises';
import axios from "axios";

class PedidosController {

    constructor() {
        //console.log("Iniciando el controlador...")
    }

    public asyMtd_GetUnidadMedida = async (req: Request, res: Response) => {
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()
                .query(`ERP_GET_PED_READ_UNIDADMEDIDA`)
            res.json({
                message: "Lista de alertas",
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

    public asyMtd_GetProductos = async (req: Request, res: Response) => {
        const { nombreProducto } = req.query
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()
                .input('PNVA_IN_NOMPRODUCTO', sql.VarChar, nombreProducto)
                .execute(`ERP_GET_PED_READ_ERP_LOG_PROD10`)
            res.json({
                message: "Lista de alertas",
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

    public asyMtd_GetClientes = async (req: Request, res: Response) => {
        const { numDocumento } = req.query
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()
                .input('PNVA_IN_NUMDOCUMENTO', sql.VarChar, numDocumento)
                .execute(`ERP_GET_PED_READ_ERP_COM_CABCLI`)
            res.json({
                message: "Lista de Clientes",
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

    public asyMtd_GetClientesPage = async (req: Request, res: Response) => {
        const { numDocumento, page, pagesize } = req.query
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()
                .input('PNVA_IN_NUMDOCUMENTO', sql.VarChar, numDocumento)
                .input('PAGE', sql.Int, page)
                .input('PAGESIZE', sql.Int, pagesize)
                .execute(`ERP_GET_PED_READPAGE_ERP_COM_CABCLI`)
            res.json({
                message: "Lista de Pedidos",
/*                 resultado: objL_query.recordset, */
                resultado: objL_query.recordsets[1],  // La lista paginada
                total: objL_query.recordsets[0][0].Total,  // El total de registros
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
    public asyMtd_SetClientes = async (req: Request, res: Response) => {

        const { cliente } = req.body;

        console.log(cliente);

        try {
            const pool = await obPt_SQLServerNode.asyM_ConnexionSQL();
            const request = pool!.request();
            request
                .input("VRAZONSOCIAL", sql.VarChar, cliente.razonsocial)
                .input("VNUMDOCUMENTO", sql.VarChar, cliente.numdocumento)
                .input("VUBIGEO", sql.VarChar, cliente.ubigeo)
                .input("VDIRECCION", sql.VarChar, cliente.direccion)
                .input("USRCRE", sql.VarChar, cliente.UsrCre)
                .input("WKSCRE", sql.VarChar, cliente.WksCre)
                .input("VTIPDOC", sql.VarChar, cliente.tipodoc)


            const result = await request.execute("ERP_CREATE_PED_SET_ERP_COM_CABCLI");

            res.status(200).json({
                message: "Clientes insertados correctamente",
                resultado: result.recordset,
                confirmacion: true
            });
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

    public asyMtd_GetEmpresa = async (req: Request, res: Response) => {
        const { nomComercial, numDocumento } = req.query
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()
                .input('PVCH_IN_NOMCOMERC', sql.VarChar, nomComercial)
                .input('PVCH_IN_NUMERORUC', sql.VarChar, numDocumento)
                .execute(`ERP_GET_ORG_READ_EMPRESA`)
            res.json({
                message: "Lista de Empresas",
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

    public asyMtd_GetPersonas = async (req: Request, res: Response) => {
        const { numDocumento } = req.query
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()
                .input('PNVA_IN_NUMDOCUMENTO', sql.VarChar, numDocumento)
                .execute(`ERP_GET_PED_IREAD_ERP_PERSONAS`)
            res.json({
                message: "Lista de Clientes",
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

    public asyMtd_GetMedioPago = async (req: Request, res: Response) => {
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()
                .query(`ERP_GET_PED_READ_ERP_VEN_MEDIOPAGO`)
            res.json({
                message: "Lista de alertas",
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

    public asyMtd_GetTipoTransporte = async (req: Request, res: Response) => {
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()
                .query(`ERP_GET_PED_READ_ERP_MAE_VIA`)
            res.json({
                message: "Lista de alertas",
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

    public asyMtd_GetTransportista = async (req: Request, res: Response) => {
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()
                .query(`ERP_GET_PED_READ_ERP_LOG_PROVEE`)
            res.json({
                message: "Lista de alertas",
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

    public asyMtd_InsertarPedidoCompleto = async (req: Request, res: Response) => {
        const { pedido, detalle } = req.body;

        try {
            const pool = await obPt_SQLServerNode.asyM_ConnexionSQL();

            // Construir XML del detalle
            const xmlDetalle = `<XML>` +
                detalle.map((item: any) => `
                    <Detalle>
                        <CodProducto>${item.CodProducto}</CodProducto>
                        <UnidadMedida>${item.UnidadMedida}</UnidadMedida>
                        <Cantidad>${item.Cantidad}</Cantidad>
                        <PrecioUnitario>${item.PrecioUnitario}</PrecioUnitario>
                    </Detalle>`).join("") +
                `</XML>`;

            /*    console.log(xmlDetalle); */

            const request = pool!.request();
            request
                .input("CodEmpresa", sql.Int, pedido.CodEmpresa)
                .input("CodCliente", sql.Int, pedido.CodCliente)
                .input("CodVia", sql.Int, pedido.CodVia)
                .input("CodProveedor", sql.Int, pedido.CodProveedor)
                .input("DirProveedor2", sql.VarChar(250), pedido.DirProveedor2)
                .input("EstadoPedido", sql.VarChar(50), pedido.EstadoPedido)
                /*                 .input("CantidadTotal", sql.Decimal(10, 2), pedido.CantidadTotal)
                                .input("PrecioTotal", sql.Decimal(10, 2), pedido.PrecioTotal) */
                .input("NroDocDestino", sql.VarChar(50), pedido.NroDocDestino)
                .input("NombreDestino", sql.VarChar(50), pedido.NombreDestino)
                .input("CodTipoComprobante", sql.Int, pedido.CodTipoComprobante)
                .input("CodMedioPago", sql.Int, pedido.CodMedioPago)
                .input("ArchivoComprobante", sql.VarChar(255), pedido.ArchivoComprobante)
                .input("NotasPedido", sql.VarChar(250), pedido.NotasPedido)
                .input("UsrCre", sql.VarChar(250), pedido.UsrCre)
                .input("WksCre", sql.VarChar(250), pedido.WksCre)
                .input("XmlDetalle", sql.Xml, xmlDetalle); // Aquí va el XML del detalle

            const result = await request.execute("ERP_SET_PED_INSER_ERP_VEN_PEDIDOS");



            res.status(200).json({
                message: "Pedido insertado correctamente",
                resultado: result.recordset,
                confirmacion: true
            });
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
    };

    public asyMtd_GetPedidos = async (req: Request, res: Response) => {
        const { fechaInicio, fechaFin, numPedido, page, pagesize } = req.query
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()
                .input('PFECINI', sql.VarChar, fechaInicio)
                .input('PFECFIN', sql.VarChar, fechaFin)
                .input('PCODPEDIDO', sql.VarChar, numPedido)
                .input('PAGE', sql.Int, page)
                .input('PAGESIZE', sql.Int, pagesize)
                .execute(`ERP_GET_PED_READ_ERP_VEN_PEDIDOS`)
            res.json({
                message: "Lista de Pedidos",
/*                 resultado: objL_query.recordset, */
                resultado: objL_query.recordsets[1],  // La lista paginada
                total: objL_query.recordsets[0][0].Total,  // El total de registros
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

    public asyMtd_GetPedidosDetalle = async (req: Request, res: Response) => {
        const { numPedido } = req.query
        try {
            const objL_Conn = await obPt_SQLServerNode.asyM_ConnexionSQL()
            const objL_query = await objL_Conn!
                .request()
                .input('PCODPEDIDO', sql.VarChar, numPedido)
                .execute(`ERP_GET_PED_READ_ERP_VEN_PEDIDOS_DETALLE`)
            res.json({
                message: "Lista de Pedidos",
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

    public asyMtd_UpdPedidosDetalle = async (req: Request, res: Response) => {
        const { detalle } = req.body;

        try {
            const pool = await obPt_SQLServerNode.asyM_ConnexionSQL();

            // Construir XML del detalle
            const xmlDetalle = `<XML>` +
                detalle.map((item: any) => `
                    <Detalle>
                        <CodPedido>${item.CodPedido}</CodPedido>
                        <CodProducto>${item.CodProducto}</CodProducto>
                        <Cantidad2>${item.Cantidad2}</Cantidad2>
                        <PrecioUnitario>${item.PrecioUnitario}</PrecioUnitario>
                        <UsrMod>${item.UsrMod}</UsrMod>
                        <WksMod>${item.WksMod}</WksMod>
                    </Detalle>`).join("") +
                `</XML>`;

         /*    console.log(xmlDetalle); */

            const request = pool!.request();
            request
                .input("PXmlDetalle", sql.Xml, xmlDetalle); // Aquí va el XML del detalle
            const result = await request.execute("ERP_UPD_PED_SET_ERP_VEN_PEDIDOS_DETALLE");

            res.status(200).json({
                message: "Pedido actualizados correctamente",
                resultado: result.recordset,
                confirmacion: true
            });
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

    public asyMtd_UpdPedidoStatus = async (req: Request, res: Response) => {

        const { pedido } = req.body;

        try {
            const pool = await obPt_SQLServerNode.asyM_ConnexionSQL();
            const request = pool!.request();
            request
                .input("PCODPEDIDO", sql.VarChar, pedido.numPedido)
                .input("POPTION", sql.VarChar, pedido.option)


            const result = await request.execute("ERP_UPD_PED_SET_ERP_VEN_PEDIDOS");

            res.status(200).json({
                message: "Pedido actulizado correctamente",
                resultado: result.recordset,
                confirmacion: true
            });
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

    public asyMtd_GetDatosPorDNI = async (req: Request, res: Response) => {
        const { dni } = req.query
        try {
           /*  const dni = req.params.dni; */
         /*   console.log(dni); */
            const apiUrl = `https://api.apis.net.pe/v2/reniec/dni?numero=${dni}`;
            const token = 'Bearer apis-token-13911.KPFFJUF3h4KPSlUcHYehGd1BT1E1lcH9';

            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: token
                }
            });

            res.json({
                message: "Datos obtenidos correctamente",
                resultado: response.data,
                confirmacion: true
            });
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
    };

    public asyMtd_GetDatosPorRUC = async (req: Request, res: Response) => {
        const { ruc } = req.query
        try {
           /*  const dni = req.params.dni; */
           /* console.log(ruc); */
            const apiUrl = `https://api.apis.net.pe/v1/ruc?numero=${ruc}`;
            const token = 'Bearer apis-token-13911.KPFFJUF3h4KPSlUcHYehGd1BT1E1lcH9';

            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: token
                }
            });

            res.json({
                message: "Datos obtenidos correctamente",
                resultado: response.data,
                confirmacion: true
            });
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
    };    

}
export default new PedidosController()