import express from 'express';
import * as PersonaC from '../Controllers/PersonaC';

export const router = express.Router();

//Get Personas.
router.get('/', PersonaC.getPersonas);

//Crear una Persona.
router.post('/', PersonaC.createPersona);

//Actualizar una Persona.
router.put('/:personaId', PersonaC.updatePersona);

//Eliminar una Persona
router.delete('/:personaId', PersonaC.deletePersona);
