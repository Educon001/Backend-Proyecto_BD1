import express from 'express';
import * as CentroSaludC from '../Controllers/CentroSaludC';

export const router = express.Router();

//Get Centros de Vacunacion
router.get('/', CentroSaludC.getCentrosVacunacion);

//Crear un Centro de Vacunacion
router.post('/', CentroSaludC.createCentroVacunacion);

//Actualizar un Centro de Vacunacion
router.put('/:csCode', CentroSaludC.updateCentroSalud);

//Eliminar un Centro de Vacunacion
router.delete('/:cvCode', CentroSaludC.deleteCentroVacunacion);