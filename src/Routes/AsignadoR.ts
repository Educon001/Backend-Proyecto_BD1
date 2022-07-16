import express from 'express';
import * as AsignadoC from '../Controllers/AsignadoC';

export const router = express.Router();

//Get Asignado
router.get('/', AsignadoC.getAsignado);

//Crear un Asignado
router.post('/', AsignadoC.createAsignado);

//Actualizar un Asignado
router.put(
    '/:asignadoIdPersonalSalud/:asignadoCodeCentroSalud/:asignadoDateAsignado',
    AsignadoC.updateAsignado);

//Eliminar un Asignado
router.delete(
    '/:asignadoIdPersonalSalud/:asignadoCodeCentroSalud/:asignadoDateAsignado',
    AsignadoC.deleteAsignado);
