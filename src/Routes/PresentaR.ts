import express from 'express';
import * as PresentaC from '../Controllers/PresentaC';

export const router = express.Router();

//Get Presenta
router.get('/', PresentaC.getPresenta);

//Crear un Presenta
router.post('/', PresentaC.createPresenta);

//Actualizar un Presenta
router.put('/:presentaCodeVacuna/:presentaCodeSintoma',
    PresentaC.updatePresenta);

//Eliminar un Presenta
router.delete('/:presentaCodeVacuna/:presentaCodeSintoma',
    PresentaC.deletePresenta);
