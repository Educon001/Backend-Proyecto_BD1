export class Hospitalizado {
   public dateHospitalizado: Date;

   constructor(
       public idPaciente: string,
       public codeCentroH: number,
       dateHospitalizado: Date,
   ) {
      var timezoneOffset = dateHospitalizado.getTimezoneOffset() * 60000;
      this.dateHospitalizado = new Date(
          dateHospitalizado.getTime() + timezoneOffset);
   }
}


