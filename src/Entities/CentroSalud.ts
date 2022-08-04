export class CentroSalud {
   public managerDate: Date;

   constructor(
       public name: string,
       public address: string,
       public idMedico: string,
       public codeMunicipio: number,
       managerDate: Date,
       public code?: number,
   ) {
      var timezoneOffset = managerDate.getTimezoneOffset() * 60000;
      this.managerDate = new Date(managerDate.getTime() + timezoneOffset);
   }
}
