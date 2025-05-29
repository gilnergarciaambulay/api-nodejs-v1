import chalk from "chalk";
import { NextFunction } from "express";
import { Request, Response } from 'express'
import morgan from "morgan";
import winston from "winston";
import expressWinston from "express-winston"
import 'winston-daily-rotate-file';

/**
 * Muestra la información de las peticiones que realiza el cliente
 * @param {any[]} tokens Informacion del header
 * @param {Request} req Request del cliente
 * @param {Response} res  Response del servidor
 * @date 23/09/2021 
 */
export const morganMiddleware = morgan(function (tokens, req: Request, res: Response) {
    return [
        '\n',
        chalk.hex('#ff4757').bold('Logs -> '),
        chalk.hex('#40407a').bold(new Date().toLocaleString("en-US", {timeZone: "America/Lima"}).slice(0, 15)),
        chalk.hex('#34ace0').bold(tokens.method(req, res)),
        chalk.hex('#ffb142').bold(tokens.status(req, res)),
        chalk.hex('#ff5252').bold(tokens.url(req, res)),
        chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms'),
        chalk.hex('#f78fb3').bold('@ ' + tokens.date(req, res, 'web')),
        chalk.yellow(tokens['remote-addr'](req, res)),
        chalk.hex('#fffa65').bold('from ' + tokens.referrer(req, res)),
        chalk.hex('#1e90ff')(tokens['user-agent'](req, res)),
        '\n',
    ].join(' ');
});

export const wistonSuccess = expressWinston.logger({
    format: winston.format.json(),
    transports: [
        new winston.transports.DailyRotateFile({
            filename: `logs/normal/${new Date().toISOString().slice(0, 10)}/info-%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
})

export const wistonError = expressWinston.errorLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.DailyRotateFile({
            filename: `logs/error/${new Date().toISOString().slice(0, 10)}/error-%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
})

function getCallerIP(request: any) {
    var ip = request.headers['x-forwarded-for'] ||
        request.connection.remoteAddress ||
        request.socket.remoteAddress ||
        request.connection.socket.remoteAddress;
    ip = ip.split(',')[0];
    ip = ip.split(':').slice(-1); //in case the ip returned in a format: "::ffff:146.xxx.xxx.xxx"
    return ip[0] || ip || '127.0.0.1';
}