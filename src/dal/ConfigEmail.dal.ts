import nodemailer from 'nodemailer';
import { ICorreos } from '../interfaces/ICorreos.interface';
import { config as dotenv } from 'dotenv';
import { fn_cipher } from '../utilities/correo.utilities';

// dotenv
dotenv();


/*export const Transporter = nodemailer.createTransport({
    host: process.env.EM_HOST!,
    port: (Number.isInteger(process.env.EM_PORT) ? process.env.EM_PORT : 587) as number,
    secure: false,
    requireTLS: false,
    socketTimeout: 50000,
    auth: {
        user: process.env.EM_USER!,
        pass: process.env.EM_PASS!,
    },
    logger: false,
    tls: {
        rejectUnauthorized: false
    },
    debug: false
});*/

export const Transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'test_intexpac@outlook.com',
        pass: '@Intexpac100'
    },
    logger: false,
});

/**
 * Envia los correos utilizando la libreria NodeMailer
 * @param {ICorreos} personas Datos del correo
 * @param {number} tipo  tipo de correo {Registrado,Finalizado,Generico}
 * @param {any} plantillaGenerada  Plantilla de la alerta
 * @param {string} IDPANICO  Codigo de la alerta panico
*/
export let sendMailCustom = async (personas: ICorreos, tipo: number, plantillaGenerada: any, IDPANICO: string) => {

    const easyEncrypt = fn_cipher('MSG')

    const subject = fn_Subject(`${parseInt(IDPANICO, 10)}`, `${personas.TO[0].PROCESO}`, tipo);

    let mailOptions: nodemailer.SendMailOptions = {
        from: '"Alerta" <test_intexpac@outlook.com>',
        to: personas.AA.map((a: any) => a).join(', '),
        cc: personas.AC.map((a: any) => a).join(', '),
        //to: "jvergara@intexpac.com, lfuentes@intexpac.com",
        //cc: personas.AC.map((a: any) => a).join(', '),
        //bcc:"lfuentes@intexpac.com",
        //subject: `ALERTA ${parseInt(IDPANICO, 10)} EN EL PROCESO DE ${personas.TO[0].PROCESO}`,
        subject: subject,
        //text: "Test??",
        html: plantillaGenerada,
        messageId: `${easyEncrypt(subject)}@intexpac.com`
    }
    await Transporter.sendMail(mailOptions)
}

/**
 * Envia los correos utilizando la libreria NodeMailer 
 * @param {number} tipo  tipo de correo {Registrado,Finalizado,Generico}
 * @param {string} PROCESO  El proceso
 * @param {string} IDPANICO  Codigo de la alerta panico
*/
const fn_Subject = (IDPANICO: string, PROCESO: string, tipo: number): string => {
    let objL_Subject = ""
    switch (tipo) {
        case 1:
            objL_Subject = `ALERTA ${IDPANICO} EN EL PROCESO DE ${PROCESO}`
            break;
        case 2:
            objL_Subject = `ALERTA ${IDPANICO} EN EL PROCESO DE ${PROCESO}`
            break;
        case 3:
            objL_Subject = `ALERTA EN EL PROCESO DE ${PROCESO}`
            break;
    }
    return objL_Subject
}