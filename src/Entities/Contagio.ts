export class Contagio {
   public dateContagio: Date
   constructor(
       public idPersona: string,
       public denomOMS: string,
       dateContagio: Date,
       public restTime: number,
       public casaHospitalizado: boolean,
   ) {
      var timezoneOffset = dateContagio.getTimezoneOffset() * 60000;
      this.dateContagio = new Date(dateContagio.getTime() + timezoneOffset);
   }
}
