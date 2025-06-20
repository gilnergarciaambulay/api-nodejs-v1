import { Router } from 'express'
import PedidosController from './../controllers/pedidos.controller'

const route = Router()

route.route("/getUM").get(PedidosController.asyMtd_GetUnidadMedida)
route.route("/getPersonas").get(PedidosController.asyMtd_GetPersonas)
route.route("/getProductos").get(PedidosController.asyMtd_GetProductos)
route.route("/getClientes").get(PedidosController.asyMtd_GetClientes)
route.route("/getClientesPage").get(PedidosController.asyMtd_GetClientesPage)
route.route("/setClientes").post(PedidosController.asyMtd_SetClientes)
route.route("/getEmpresa").get(PedidosController.asyMtd_GetEmpresa)
route.route("/getMedioPago").get(PedidosController.asyMtd_GetMedioPago)
route.route("/getMoneda").get(PedidosController.asyMtd_GetMoneda)
route.route("/getCondicionPago").get(PedidosController.asyMtd_GetCondicionPago)
route.route("/getTipoTransporte").get(PedidosController.asyMtd_GetTipoTransporte)
route.route("/getTransportista").get(PedidosController.asyMtd_GetTransportista)
route.route("/getPedidos").get(PedidosController.asyMtd_GetPedidos)
route.route("/setPedidos").post(PedidosController.asyMtd_InsertarPedidoCompleto)
route.route("/getPedidosDetalle").get(PedidosController.asyMtd_GetPedidosDetalle)
route.route("/updPedidosDetalle").post(PedidosController.asyMtd_UpdPedidosDetalle)
route.route("/updPedidosStatus").post(PedidosController.asyMtd_UpdPedidoStatus)
route.route("/getDNI").get(PedidosController.asyMtd_GetDatosPorDNI)
route.route("/getRUC").get(PedidosController.asyMtd_GetDatosPorRUC)



export = route