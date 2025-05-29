import * as nodemailer from 'nodemailer';
import { CorreoError, ICorreoError } from '../interfaces/ICorreoError.interface';
import { ICorreoRespuesta } from '../interfaces/ICorreoSuccess.interface';
import { ICorreos } from '../interfaces/ICorreos.interface';
import { fn_cipher } from './correo.utilities';
class SMTPService {
    private objP_Transporter: nodemailer.Transporter;

    private objP_SMTPConfigGMAIL = {
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
    }

    private objP_SMTPConfigOUTLOOK = {
        service: 'hotmail',
        auth: {
            user: 'test_intexpac@outlook.com',
            pass: '@Intexpac100'
        },
        logger: true,
    }

    constructor() {
        this.objP_Transporter = nodemailer.createTransport(this.objP_SMTPConfigGMAIL);
    }

    /**
     * Envia los correos utilizando la libreria NodeMailer
     * @param {ICorreos} personas Datos del correo
     * @param {number} tipo  tipo de correo {Registrado,Finalizado,Generico}
     * @param {any} plantillaGenerada  Plantilla de la alerta
     * @param {string} IDPANICO  Codigo de la alerta panico
    */
    sendMail(personas: ICorreos, tipo: number, plantillaGenerada: any, IDPANICO: string): Promise<ICorreoRespuesta> {
        const easyEncrypt = fn_cipher('MSG')
        const subject = this.fn_Subject(`${parseInt(IDPANICO, 10)}`, `${personas.TO[0].PROCESO}`, tipo);

        let mailOptions: nodemailer.SendMailOptions = {
            from: '"Alerta" <'+process.env.EM_USER+'>',
            to: personas.AA.map((a: any) => a).join(', '),
            cc: personas.AC.map((a: any) => a).join(', '),
            subject: subject,
            html: plantillaGenerada,
            messageId: `${easyEncrypt(subject)}@intexpac.com`
        }

        return new Promise<ICorreoRespuesta>((resolve: (msg: ICorreoRespuesta) => void, reject: (err: CorreoError) => void) => {
            this.objP_Transporter.sendMail(mailOptions, (error, info: nodemailer.SentMessageInfo) => {
                if (error) {
                    //console.log(`error: ${error}`);
                    let objL_Error: ICorreoError = {
                        message: "No se pudo enviar el correo!",
                        error: error
                    }
                    reject(new CorreoError(objL_Error));
                } else {
                    //console.log(`Message Sent ${info.response}`);
                    let data: ICorreoRespuesta = {
                        estado: true,
                        data: {
                            messageId: info.messageId
                        }
                    }
                    resolve(data);
                }
            })
        }
        );
    }

    /**
     * Envia los correos utilizando la libreria NodeMailer 
     * @param {number} tipo  tipo de correo {Registrado,Finalizado,Generico}
     * @param {string} PROCESO  El proceso
     * @param {string} IDPANICO  Codigo de la alerta panico
    */
    fn_Subject = (IDPANICO: string, PROCESO: string, tipo: number): string => {
        let objL_Subject = ""
        switch (tipo) {
            case 1:
                objL_Subject = `Alerta ${IDPANICO} en el proceso de ${PROCESO}`
                break;
            case 2:
                objL_Subject = `Alerta ${IDPANICO} en el proceso de ${PROCESO}`
                break;
            case 3:
                objL_Subject = `Alerta en el proceso de ${PROCESO}`
                break;
            case 4:
                objL_Subject = `Alerta en el proceso de ${PROCESO} cancelada`
                break;
        }
        return objL_Subject
    }
}

export = new SMTPService()