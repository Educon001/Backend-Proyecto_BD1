import {CentroSalud} from '.';
export class CentroVacunacion extends CentroSalud {
  constructor(codeCS: number, nameCS: string, addressCS: string, codeMunicipioCS: number, managerDate: Date) {
    super(codeCS, nameCS, addressCS, codeMunicipioCS, managerDate);
  }
}
