export class CentroSalud {
   constructor(
       public name: string,
       public address: string,
       public idMedico: string,
       public codeMunicipio: number,
       public managerDate: Date,
       public code?: number,
   ) {
   }
}
