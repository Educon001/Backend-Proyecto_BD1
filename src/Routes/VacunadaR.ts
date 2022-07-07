import express from 'express';
import * as VacunadaC from '../Controllers/VacunadaC';

export const router = express.Router();

//Get Personas.
router.get('/', VacunadaC.getVacunados);

//Crear una Persona.
router.post('/', VacunadaC.createVacunado);

//Actualizar una Persona.
router.put('/:vacunadaId/:vacunadaCodeVacuna/:vacunadaCodeCentro/:vacunadaIdPersonal/:vacunadaDateVacuna', VacunadaC.updateVacunado);

//Eliminar una Persona
router.delete('/:vacunadaId/:vacunadaCodeVacuna/:vacunadaCodeCentro/:vacunadaIdPersonal/:vacunadaDateVacuna', VacunadaC.deleteVacunado);
