import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config as dotenv } from 'dotenv';
import { token } from 'morgan';

// dotenv
dotenv();

export const asyMtdComprobarToken1 = async (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers[process.env.TK_NOMBRE!!];

    console.log("Validando Token..."+process.env.TK_NOMBRE+": "+token)

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado', confirmacion: false });
    }

    try {
        const jwtPayload = <any>jwt.verify(token, process.env.TK_LLAVE!!);
        res.locals.jwtPayload = jwtPayload;
        res.header(process.env.TK_NOMBRE!!, token);
        next();
    } catch (error) {
        return res.status(401).send('Invalid Token');
    }
};

export const asyMtdComprobarToken2 = async (req: Request, res: Response, next: NextFunction) => {
    const headerName = process.env.TK_NOMBRE || 'authorization';
    const token = req.headers[headerName] as string;

    console.log("Validando Token..."+process.env.TK_NOMBRE+": "+token)

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado', confirmacion: false });
    }

    try {
        const jwtPayload = jwt.verify(token, process.env.TK_LLAVE || 'mi_clave_secreta');
        res.locals.jwtPayload = jwtPayload;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado', confirmacion: false });
    }
};

export const asyMtdComprobarToken3 = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log("Validando Token..."+process.env.TK_NOMBRE+": "+token)

    if (!token) {
        return res.status(401).json({ message: "Token no proporcionado", confirmacion: false });
    }

    try {
        const jwtPayload = <any>jwt.verify(token, process.env.TK_LLAVE!!);
        res.locals.jwtPayload = jwtPayload;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado", confirmacion: false });
    }
};

export const asyMtdComprobarToken4 = async (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers[process.env.TK_NOMBRE!!];
    console.log("Token recibido:", token);
    console.log("Clave usada:", process.env.TK_LLAVE);

    try {
        const jwtPayload = <any>jwt.verify(token, process.env.TK_LLAVE!!);
        res.locals.jwtPayload = jwtPayload;
        res.header(process.env.TK_NOMBRE!!, token);
        next();
    } catch (error: any) {
        console.error("Error al verificar token:", error.message);
        return res.status(401).send({
            message: "Token inválido o expirado",
            confirmacion: false
        });
    }
};

export const asyMtdComprobarToken = async (req: Request, res: Response, next: NextFunction) => {
    const token_app = req.headers[process.env.TK_NOMBRE!] as string | undefined;

    if (!token_app) {
        return res.status(401).json({ message: "Token no proporcionado", confirmacion: false });
    }

    try {
        const jwtPayload = jwt.verify(token_app, process.env.TK_LLAVE!) as any;
        res.locals.jwtPayload = jwtPayload;
        res.header(process.env.TK_NOMBRE!, token_app);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado", confirmacion: false });
    }
};

export const asyMtdRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(403).json({ message: "Refresh token no proporcionado", confirmacion: false });
    }

    console.log("Token recibido:", process.env.TK_TIEMPO_REFRESH);

    try {
        const payload = jwt.verify(refreshToken, process.env.TK_LLAVE!) as any;

        const newAccessToken = jwt.sign(
            {
                id: payload.id,
                usuario: payload.usuario,
                rol: payload.rol
            },
            process.env.TK_LLAVE || 'clave_predeterminada',
            { expiresIn: '2m'   }
        );

        res.locals.newAccessToken = newAccessToken;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Refresh token expirado o inválido", confirmacion: false });
    }
};

