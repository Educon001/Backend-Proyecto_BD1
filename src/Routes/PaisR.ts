import express from 'express';
import * as PaisC from '../Controllers/PaisC';

export const router = express.Router();

//Get Personas.
router.get('/', PaisC.getPaises);

//Crear una Persona.
router.post('/', PaisC.createPais);

//Actualizar una Persona.
router.put('/:paisCode', PaisC.updatePais);

//Eliminar una Persona
router.delete('/:paisCode', PaisC.deletePersona);
