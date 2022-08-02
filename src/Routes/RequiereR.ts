import express from 'express';
import * as RequiereC from '../Controllers/RequiereC';

export const router = express.Router();

//Get Requiere
router.get('/', RequiereC.getRequiere);

//Get Requiere por paciente
router.get('/:requierePaciente', RequiereC.getRequierePaciente);

//Crear un Requiere
router.post('/', RequiereC.createRequiere);

//Actualizar un Requiere
router.put('/:requiereCodeTratamiento/:requiereidPaciente/:requiereDate',
    RequiereC.updateRequiere);

//Eliminar un Requiere
router.delete('/:requiereCodeTratamiento/:requiereidPaciente/:requiereDate',
    RequiereC.deleteRequiere);
