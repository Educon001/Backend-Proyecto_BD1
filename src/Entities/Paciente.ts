import {Persona} from '.';
export class Paciente extends Persona {
    constructor(idP: string, nameP:string, lastNameP: string, sexP: string, birthdateP: Date, highRiskP:boolean ) {
        super(idP,nameP, lastNameP, sexP, birthdateP, highRiskP);
    }
}