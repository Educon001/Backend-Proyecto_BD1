export class Vacuna {
  constructor(
      public code: number,
      public name: string,
      public lote: number,
      public cantDosis: number,
      public type: string,
      public laboratory: string,
      public code_Pais: string,
  ) {
  }
}
