import { Router } from "express"
import ubigeoController from "../controllers/ubigeo.controller"

const route = Router()

route.route("/getDepartamento").get(ubigeoController.asyMtd_GetDepartamento)
route.route("/getProvincia").get(ubigeoController.asyMtd_GetProvincia)
route.route("/getDistrito").get(ubigeoController.asyMtd_GetDistrito)

export = route