/**
 * Organiza los correos de acuerdo a los tipos establecidos en el sistema {AA,AC,BC}. 
 * Asi mismo almacena la informacion adicional
 * @param {any[]} AA Correos principales 
 * @param {any[]} AC Correos en copia
 * @param {any[]} BC Correos en oculto
 * @param {any[]} TO DE
 * @param {any[]} DATA Informacion adicional
 */
export interface ICorreos {
    AA: any[];
    AC: any[];
    BC: any[];
    TO: any[];
    DATA?:{
        [key:string] : string
    }
} 