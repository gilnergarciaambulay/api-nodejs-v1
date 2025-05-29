import { Router, Request, Response } from 'express'
import { asyMtdComprobarToken,asyMtdRefreshToken } from '../middleware/token.middleware'
import objL_UsuarioController from './../controllers/usuario.controller'
import { get } from 'http'

const route = Router()

route.route("/login").post(objL_UsuarioController.asyMtd_IniciarSesion)

route.route("/menu").get(objL_UsuarioController.asyMtd_GenerarMenuUsuario)

route.route("/notificaciones").get(objL_UsuarioController.asyMtd_DatosDeLosUsuarioGruposAlerta)

route.route("/cambio-contrasenia").post(objL_UsuarioController.asyMtd_CambioDeContrasenia)

/* route.route("/pruebaToken").get(asyMtdComprobarToken, (req: Request, res: Response) => {
    res.json({
        data:"XDDDD"
    })
})
 */

route.route("/pruebaToken").get(asyMtdComprobarToken, (req: Request, res: Response) => {
    const payload = res.locals.jwtPayload;
    res.json({
        message: "Token válido",
        usuario: payload?.usuario,
        rol: payload?.rol,
        confirmacion: true
    });
});

route.route("/refresh-token").post(asyMtdRefreshToken, (req: Request, res: Response) => {
   // Extraemos el nuevo access token generado en el middleware anterior
   const newAccessToken = res.locals.newAccessToken;

   // Enviamos el nuevo token al cliente
   res.json({
       message: "Token refrescado correctamente",
       accessToken: newAccessToken
   });
});

 route.route("/logout").post((req: Request, res: Response) => {
    // El frontend debe borrar el token al recibir esta confirmación
    res.json({
        message: "Sesión cerrada correctamente",
        confirmacion: true
    });
});






export = route