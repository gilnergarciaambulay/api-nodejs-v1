export class CorreoError extends Error {
    public error: Error
    constructor(iCorreoError: ICorreoError) {
        super(iCorreoError.message);
        this.name = "CorreoError";
        this.error = iCorreoError.error
    }
}

export interface ICorreoError {
    message: string
    error: Error
}