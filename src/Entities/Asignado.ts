export class Asignado {
   public dateAsignado: Date;

   constructor(
       public idPersonalSalud: string,
       public codeCentroSalud: number,
       dateAsignado: Date,
   ) {
      var timezoneOffset = dateAsignado.getTimezoneOffset() * 60000;
      this.dateAsignado = new Date(dateAsignado.getTime() + timezoneOffset);
   }
}





