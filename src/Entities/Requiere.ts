export class Requiere {
   public date: Date;

   constructor(
       public codeTratamiento: number,
       public idPaciente: string,
       date: Date,
       public estado: string,
   ) {
      var timezoneOffset = date.getTimezoneOffset() * 60000;
      this.date = new Date(date.getTime() + timezoneOffset);
   }
}
