import express from 'express';
import * as SintomaC from '../Controllers/SintomaC';
import {Sintoma} from '../Entities';

export const router = express.Router();

//Get sintoma.
router.get('/', SintomaC.getSintoma);

//Crear un sintoma .
router.post('/', SintomaC.createSintoma);

//Actualizar un sintoma.
router.put('/:sintomaCode', SintomaC.updateSintoma);

//Eliminar un sintoma
router.delete('/:sintomaCode', SintomaC.deleteSintoma);
