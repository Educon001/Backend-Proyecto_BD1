export class Persona {
  constructor(
      public ID: string,
      public name: string,
      public lastName: string,
      public sex: string,
      public birthdate: Date,
      public highRisk: boolean,
  ) {
  }
}