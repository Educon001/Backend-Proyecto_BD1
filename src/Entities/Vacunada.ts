export class Vacunada {
   public dateVacuna: Date;

   constructor(
       public idPersona: string,
       public codeVacuna: number,
       public codeCentroVacunacion: number,
       public idPersonal: string,
       dateVacuna: Date,
       public dosis: number,
   ) {
      var timezoneOffset = dateVacuna.getTimezoneOffset() * 60000;
      this.dateVacuna = new Date(dateVacuna.getTime() + timezoneOffset);
   }
}


