export class Contagio {
  constructor(
      public idPersona: string,
      public denomOMS: string,
      public dateContagio: Date,
      public restTime: number,
      public casaHospitalizado: boolean,
  ) {
  }
}
