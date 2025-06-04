import objL_express from "express";
import { config as dotenv } from 'dotenv';
import objL_cors from "cors";
import objL_fs from "fs";
import objL_path from 'path';
import { morganMiddleware, wistonError, wistonSuccess } from './middleware/morgan.middleware'

/**
 * Iniciando el express
 * @date 24/09/2021  
 */
const objL_app = objL_express()
process.env.TZ = "America/Lima";

/**
 * Se configura el dotenv, nos permite declarar N° variables de entorno
 * en el archvio .ENV
 * @date 24/09/2021  
 */
dotenv();

/**
 * Se configura el cors y el morgan
 * @date 24/09/2021  
 */
objL_app.use(objL_cors({}))
objL_app.use(morganMiddleware)
//objL_app.use(objL_express.urlencoded({ extended: false }));
objL_app.use(objL_express.json())
objL_app.disable('etag');

/**
 * Se configura la variable que almacenara la hora del servior
 * Las horas se trabajan en formato { 24 }
 * Configuracion actual:  6:00 PM a 8:00 AM guardara los logger para evitar exeso de informacion
 * @param {number} objL_HoraInicio Hora de inicio para guardar la informacion
 * @param {number} objL_HoraFin Hora de fin para guardar la informacion 
 * @date 24/09/2021 
*/
let objL_HorasLogger = new Date().getHours();
let objL_HoraInicio: number = 18;
let objL_HoraFin: number = 8;

/**
 * Guarda las peticiones realizadas al servidor
 * @date 24/09/2021 
 */
if (objL_HorasLogger >= objL_HoraInicio || objL_HorasLogger <= objL_HoraFin) {
    objL_app.use(wistonSuccess);
}

/**
 * Rutas de la api
 * @date 24/09/2021  
 */
objL_app.use('/api/user',                   require('./routes/usuario.route'))
objL_app.use('/api/reportes',               require('./routes/reportes.route'));
objL_app.use('/api/pedidos',               require('./routes/pedidos.route'));
objL_app.use('/api/ubigeo',               require('./routes/ubigeo.route'));
/**
 * Guarda los errores que se generen en el sistema en un archivo log por fecha
 * @date 24/09/2021 
 * entre 6 PM a 8 AM guardara los logger para evitar exeso de informacion
 */
if (objL_HorasLogger >= objL_HoraInicio || objL_HorasLogger <= objL_HoraFin) {
    objL_app.use(wistonError);
}

// Creando una ruta estatica pra poder acceder a las imagenes de la carpeta assets
objL_app.use('/portada', objL_express.static(objL_path.join(__dirname, 'assets')));

/**
 * Inicia el servidor de acuerdo a las configuraciones
 * @date 24/09/2021  
 */
objL_app.listen(Number(process.env.SV_PORT),"0.0.0.0" , () => {
    console.log(`Server start in Port : ${process.env.SV_PORT}`)
})



