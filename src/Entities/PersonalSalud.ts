import {Persona} from '.';

export class PersonalSalud extends Persona {
  public email: string;
  public type: string;

  constructor(
      nuevoEmail: string, nuevoType: string, idP: string, nameP: string,
      lastNameP: string, sexP: string, birthdateP: Date, highRiskP: boolean) {
    super(idP, nameP, lastNameP, sexP, birthdateP, highRiskP);
    this.email = nuevoEmail;
    this.type = nuevoType;
  }
}
