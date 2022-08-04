import express from 'express';
import * as PersonaC from '../Controllers/PersonaC';

export const router = express.Router();

//Get Personas.
router.get('/', PersonaC.getPersonas);

router.get('/ps', PersonaC.getPersonalSalud);

router.get('/paciente', PersonaC.getPacientes);

//Crear una Persona.
router.post('/', PersonaC.createPersona);

//Crear un Personal de salud
router.post('/ps', PersonaC.createPersonalSalud);

//Crear un Paciente
router.post('/paciente', PersonaC.createPaciente);

//Actualizar una Persona.
router.put('/:personaId', PersonaC.updatePersona);

//Actualizar un personal de salud.
router.put('/ps/:personalId', PersonaC.updatePersonalSalud);

//Eliminar una Persona
router.delete('/:personaId', PersonaC.deletePersona);

//Eliminar un Personal Salud
router.delete('/ps/:personalId', PersonaC.deletePersonalSalud);

//Eliminar un Paciente
router.delete('/paciente/:pacienteId', PersonaC.deletePaciente);
