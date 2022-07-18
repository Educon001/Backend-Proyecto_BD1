export class Medicamento {
   constructor(
       public name: string,
       public component: string,
       public concentration: number,
       public code?: number,
   ) {
   }
}
