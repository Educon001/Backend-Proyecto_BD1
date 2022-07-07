import {CentroSalud} from '.';

export class CentroVacunacion extends CentroSalud {
  constructor(
      nameCS: string, addressCS: string, idMedicoCS: string,
      codeMunicipioCS: number, managerDate: Date, codeCS?: number) {
    super(nameCS, addressCS, idMedicoCS, codeMunicipioCS, managerDate, codeCS);
  }
}
