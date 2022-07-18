export class Persona {
   constructor(
       public id: string,
       public name: string,
       public lastName: string,
       public sex: string,
       public birthdate: Date,
       public highRisk: boolean,
   ) {
   }
}