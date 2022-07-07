import express from 'express';
import * as VacunaC from '../Controllers/VacunaC';

export const router = express.Router();

//Get Personas.
router.get('/', VacunaC.getVacuna);

//Crear una Persona.
router.post('/', VacunaC.createVacuna);

//Actualizar una Persona.
router.put('/:vacunaCode', VacunaC.updateVacuna);

//Eliminar una Persona
router.delete('/:vacunaCode', VacunaC.deleteVacuna);
