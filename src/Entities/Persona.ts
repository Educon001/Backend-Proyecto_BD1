export class Persona {
   public birthdate: Date;

   constructor(
       public id: string,
       public name: string,
       public lastName: string,
       public sex: string,
       birthdate: Date,
       public highRisk: boolean,
   ) {
      var timezoneOffset = birthdate.getTimezoneOffset() * 60000;
      this.birthdate = new Date(birthdate.getTime() + timezoneOffset);
   }
}