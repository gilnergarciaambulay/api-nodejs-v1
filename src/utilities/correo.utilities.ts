import objL_fs from "fs";
import objL_path from 'path';
import { ICorreos } from "../interfaces/ICorreos.interface";
import * as sql from 'mssql'

/**
 * Almacena las rutas de las plantillas de los correos
 * @date 23/09/2021
*/
enum RutasPlantillas {
    Registrado = '../assets/plantillas/pl_automatas_registrado.html',
    Finalizado = '../assets/plantillas/pl_automatas_finalizado.html',
    General = '../assets/plantillas/pl_automatas_oct.html',
    Cancelado = '../assets/plantillas/pl_automatas_cancelado.html'
}


/**
 * Genera la plantilla de acuerdo al tipo de correo a enviar
 * @param {ICorreos} iCorreo Correos de los usuarios AC, AC, BC
 * @param {number} tipo  Tipo de correo a enviar {REGISTRADO, FINALIZADO, GENERAL}
 * @return Retorna el texto de la plantilla generada
 * @date 23/09/2021
*/
const fn_GenerarPlantillaCorreo = (iCorreo: ICorreos, tipo: number): string => {
    let objL_Personas = iCorreo.TO[0]
    switch (tipo) {
        case 1:
            return fn_RemplazarDatosRegistroAlerta(objL_Personas)
            break;
        case 2:
            return fn_RemplazarDatosFinalizadoAlerta(objL_Personas)
            break;
        case 3:
            return fn_RemplazarDatosGeneralAlerta(iCorreo)
            break;
        case 4:
            return fn_RemplazarDatosCancelarAlerta(objL_Personas)
            break;
        default:
            throw new Error('¡No se pudo generar la plantilla!')
    }
    return "";
}

/**
 * Remplaza la informacion
 * @param {any} datos Datos generales { Correos,Nombres,Alerta }
 * @return Retorna el texto de la plantilla generada
 * @date 23/09/2021
*/
const fn_RemplazarDatosRegistroAlerta = (datos: any): string => {
    let objL_Plantilla = objL_fs.readFileSync(objL_path.join(__dirname, RutasPlantillas.Registrado)).toString()
    objL_Plantilla = objL_Plantilla.replace('{{nombre_persona}}', datos.PERSONA);
    objL_Plantilla = objL_Plantilla.replace('{{motivo_alerta}}', datos.ALERTA);
    objL_Plantilla = objL_Plantilla.replace('{{proceso_alerta}}', datos.PROCESO);
    objL_Plantilla = objL_Plantilla.replace('{{planta_alerta}}', datos.PLANTA);
    objL_Plantilla = objL_Plantilla.replace('{{hora_alerta}}', `${datos.HORA}`);
    objL_Plantilla = objL_Plantilla.replace('{{fecha_alerta}}', `${datos.FECHA}`);
    return objL_Plantilla
}

/**
 * Remplaza la informacion
 * @param {any} datos Datos generales { Correos,Nombres,Alerta }
 * @return Retorna el texto de la plantilla generada
 * @date 23/09/2021
*/
const fn_RemplazarDatosFinalizadoAlerta = (datos: any): string => {
    let objL_Plantilla = objL_fs.readFileSync(objL_path.join(__dirname, RutasPlantillas.Finalizado)).toString()
    objL_Plantilla = objL_Plantilla.replace('{{nombre_persona}}', datos.PERSONA);
    objL_Plantilla = objL_Plantilla.replace('{{motivo_alerta}}', datos.ALERTA);
    objL_Plantilla = objL_Plantilla.replace('{{proceso_alerta}}', datos.PROCESO);
    objL_Plantilla = objL_Plantilla.replace('{{planta_alerta}}', datos.PLANTA);
    objL_Plantilla = objL_Plantilla.replace('{{hora_alerta}}', `${datos.HORA}`);
    objL_Plantilla = objL_Plantilla.replace('{{fecha_alerta}}', `${datos.FECHA}`);
    return objL_Plantilla
}

/**
 * Remplaza la informacion
 * @param {any} datos Datos generales { Correos,Nombres,Alerta }
 * @return Retorna el texto de la plantilla generada
 * @date 23/09/2021
*/
const fn_RemplazarDatosCancelarAlerta = (datos: any): string => {
    let objL_Plantilla = objL_fs.readFileSync(objL_path.join(__dirname, RutasPlantillas.Cancelado)).toString()
    objL_Plantilla = objL_Plantilla.replace('{{nombre_persona}}', datos.PERSONA);
    objL_Plantilla = objL_Plantilla.replace('{{motivo_alerta}}', datos.ALERTA);
    objL_Plantilla = objL_Plantilla.replace('{{proceso_alerta}}', datos.PROCESO);
    objL_Plantilla = objL_Plantilla.replace('{{planta_alerta}}', datos.PLANTA);
    objL_Plantilla = objL_Plantilla.replace('{{hora_alerta}}', `${datos.HORA}`);
    objL_Plantilla = objL_Plantilla.replace('{{fecha_alerta}}', `${datos.FECHA}`);
    return objL_Plantilla
}

/**
 * Remplaza la informacion
 * @param {any} datos Datos generales { Correos,Nombres,Alerta }
 * @return Retorna el texto de la plantilla generada
 * @date 23/09/2021
*/
const fn_RemplazarDatosGeneralAlerta = (datos: any): string => {
    let objL_Plantilla = objL_fs.readFileSync(objL_path.join(__dirname, RutasPlantillas.General)).toString()
    objL_Plantilla = objL_Plantilla.replace('{{TEXT}}', datos.DATA!.TEXT);
    return objL_Plantilla
}

/**
 * Organiza los correos de acuerdo a los tipos establecidos en el sistema {AA,AC,BC}. 
 * Asi mismo almacena la informacion adicional
 * @param {IProcedureResult} correos Correos de los grupos
 * @param {IProcedureResult} alerta  Datos de la alerta
 * @date 23/09/2021
 */
const fn_OrganizarCorreos = (correos: sql.IProcedureResult<any>, alerta: sql.IProcedureResult<any>): ICorreos => {
    let objL_iCorreos: ICorreos = {
        AA: [],
        BC: [],
        AC: [],
        TO: []
    }

    objL_iCorreos = { ...objL_iCorreos, TO: alerta.recordset }

    correos.recordset.forEach((usuario: any) => {
        if (usuario.EMAIL !== '') {
            //console.log("Con correo!",usuario)
            if (usuario.TIPO == 'AA') {
                objL_iCorreos = {
                    ...objL_iCorreos, AA: [...objL_iCorreos.AA, `${usuario.USUARIO} <${usuario.EMAIL}>`]
                }
            } else if (usuario.TIPO == 'AC') {
                objL_iCorreos = {
                    ...objL_iCorreos, AC: [...objL_iCorreos.AC, `${usuario.USUARIO} <${usuario.EMAIL}>`]
                }
            } else if (usuario.TIPO == 'BC') {
                objL_iCorreos = {
                    ...objL_iCorreos, BC: [...objL_iCorreos.BC, `${usuario.USUARIO} <${usuario.EMAIL}>`]
                }
            }
        } else {
            //console.log("Sin correo!",usuario)
        }
    })
    //console.log(objL_iCorreos)
    return objL_iCorreos;
}

/**
 * Encripta el texto en base a un key. 
 * @param {string} salt Key, con el cual se encriptara el texto
 * @param {string} text Cadena de texto el cual sera encriptada
 * @date 01/10/2021
 */
export const fn_cipher = (salt: string) => {
    const textToChars = (text: string) => text.split('').map(c => c.charCodeAt(0));
    const byteHex = (n: any) => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = (code: any) => textToChars(salt).reduce((a: number, b: number) => a ^ b, code);

    return (text: string) => text.split('')
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join('');
}

const _ = {
    fn_GenerarPlantillaCorreo,
    fn_RemplazarDatosRegistroAlerta,
    fn_RemplazarDatosFinalizadoAlerta,
    fn_RemplazarDatosGeneralAlerta,
    fn_OrganizarCorreos
}

export default _;