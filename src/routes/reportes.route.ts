import { Router } from 'express'
import objL_reportesController from './../controllers/reportes.controller'

const route = Router()

route.route("/getEficienciaLineaCostura").get(objL_reportesController.asyMtd_GetEficienciaLineaCostura)  
route.route("/getSemanasAnio").get(objL_reportesController.asyMtd_GetSemanaAnio)  
route.route("/getCosturaEficienciaLinea").get(objL_reportesController.asygetCosturaEficienciaLinea) 
route.route("/getLineasByAreas").get(objL_reportesController.asyMtd_GetLineasByAreas) 
route.route("/getCosturaEficienciaIndividualBihodiariaCostura").get(objL_reportesController.asygetCosturaEficienciaIndividualBihodiariaCostura) 
route.route("/getCosturaEficienciaIndividualDiaria").get(objL_reportesController.asygetCosturaEficienciaIndividualDiaria) 
route.route("/getCosturaEficienciaLineaAnioFiltro").get(objL_reportesController.asygetCosturaEficienciaLineaAnioFiltro) 
route.route("/getCosturaEficienciaLineaDiaria").get(objL_reportesController.asygetCosturaEficienciaLineaDiaria) 

route.route("/getCosturaEficienciaIndividualSemanal").get(objL_reportesController.asygetCosturaEficienciaIndividualSemanal) 
route.route("/getCorteEficienciaCortes").get(objL_reportesController.asygetCorteEficienciaCortes) 

route.route("/getAcabadoAvanceEncajados").get(objL_reportesController.asygetAcabadoAvanceEncajados) 
route.route("/getAcabadoAvanceVaporizado").get(objL_reportesController.asygetAcabadoAvanceVaporizado) 
route.route("/getHorario").get(objL_reportesController.asygetHorario) 


export = route