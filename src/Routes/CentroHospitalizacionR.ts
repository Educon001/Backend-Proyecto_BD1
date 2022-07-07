import express from 'express';
import * as CentroSaludC from '../Controllers/CentroSaludC';

export const router = express.Router();

//Get Centros de Hospitalizacion
router.get('/', CentroSaludC.getCentrosHospitalizacion);

//Crear un Centro de Hospitalizacion
router.post('/', CentroSaludC.createCentroHospitalizacion);

//Actualizar un Centro de Hospitalizacion
router.put('/:csCode', CentroSaludC.updateCentroSalud);

//Eliminar un Centro de Hospitalizacion
router.delete('/:chCode', CentroSaludC.deleteCentroHospitalizacion);