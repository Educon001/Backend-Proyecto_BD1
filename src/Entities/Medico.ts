import {PersonalSalud} from '.';

export class Medico extends PersonalSalud {
   constructor(
       emailPS: string, typePS: string, idP: string, nameP: string,
       lastNameP: string, sexP: string, birthdateP: Date, highRiskP: boolean) {
      super(emailPS, typePS, idP, nameP, lastNameP, sexP, birthdateP,
          highRiskP);
   }
}