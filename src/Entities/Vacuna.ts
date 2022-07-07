export class Vacuna {
  constructor(
      public name: string,
      public lote: number,
      public cantDosis: number,
      public type: string,
      public laboratory: string,
      public code_Pais: number,
      public code?: number,
  ) {
  }
}
