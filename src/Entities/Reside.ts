export class Reside {
   public dateReside: Date;

   constructor(
       public codeProvincia: number,
       public idPersona: string,
       dateReside: Date,
   ) {
      var timezoneOffset = dateReside.getTimezoneOffset() * 60000;
      this.dateReside = new Date(dateReside.getTime() + timezoneOffset);
   }
}
