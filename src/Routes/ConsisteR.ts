import express from 'express';
import * as ConsisteC from '../Controllers/ConsisteC';
import {Consiste} from '../Entities';

export const router = express.Router();

//Get Consiste
router.get('/', ConsisteC.getConsiste);

//Get Consiste por tratamiento
router.get('/:consisteTratamiento', ConsisteC.getConsisteTratamiento);

//Crear un Consiste
router.post('/', ConsisteC.createConsiste);

//Actualizar un Consiste
router.put('/:consisteTratamiento/:consisteMedicamento',
    ConsisteC.updateConsiste);

//Eliminar un Consiste
router.delete('/:consisteTratamiento/:consisteMedicamento',
    ConsisteC.deleteConsiste);
