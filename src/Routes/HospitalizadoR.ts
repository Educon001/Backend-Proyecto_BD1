import express from 'express';
import * as HospitalizadoC from '../Controllers/HospitalizadoC';

export const router = express.Router();

//Get Hospitalizado
router.get('/', HospitalizadoC.getHospitalizado);

//Crear un Hospitalizado
router.post('/', HospitalizadoC.createHospitalizado);

//Actualizar un Hospitalizacion
router.put(
    '/:hospitalizadoIdPaciente/:hospitalizadoCodeCentroH/:hospitalizadoDateHospitalizado',
    HospitalizadoC.updateHospitalizado);

//Eliminar un hospitalizacion
router.delete(
    '/:hospitalizadoIdPaciente/:hospitalizadoCodeCentroH/:hospitalizadoDateHospitalizado',
    HospitalizadoC.deleteHospitalizado);
