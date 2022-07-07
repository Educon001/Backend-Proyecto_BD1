import express from 'express';
import * as EstadoC from '../Controllers/EstadoC';

export const router = express.Router();

//Get Personas.
router.get('/', EstadoC.getEstados);

//Crear una Persona.
router.post('/', EstadoC.createEstado);

//Actualizar una Persona.
router.put('/:estadoCode', EstadoC.updateEstado);

//Eliminar una Persona
router.delete('/:estadoCode', EstadoC.deleteEstado);
