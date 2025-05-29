/**
 * Funcion que controla los errores de acuerdo al tipo enviado
 * @author Joseph JDBar Barron
 * @link https://dev.to/jdbar
 */
export function instanceOfNodeError<T extends new (...args: any) => Error>(
    value: Error,
    errorType: T
): value is InstanceType<T> & NodeJS.ErrnoException {
    return value instanceof errorType;
}