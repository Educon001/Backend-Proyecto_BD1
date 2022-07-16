import express from 'express';
import * as TieneC from '../Controllers/TieneC';

export const router = express.Router();

//Get Tiene
router.get('/', TieneC.getTiene);

//Crear un Tiene
router.post('/', TieneC.createTiene);

//Actualizar un Tiene
router.put('/:tieneCodeSintoma/:tieneDenomOMS', TieneC.updateTiene);

//Eliminar un Tiene
router.delete('/:tieneCodeSintoma/:tieneDenomOMS', TieneC.deleteTiene);
