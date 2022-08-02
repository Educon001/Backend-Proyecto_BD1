import express from 'express';
import * as TieneC from '../Controllers/TieneC';
import * as AsignadoC from '../Controllers/AsignadoC';

export const router = express.Router();

//Get Tiene
router.get('/', TieneC.getTiene);

router.get('/:tieneDenomOMS', TieneC.getTieneVirus);

//Crear un Tiene
router.post('/', TieneC.createTiene);

//Actualizar un Tiene
router.put('/:tieneCodeSintoma/:tieneDenomOMS', TieneC.updateTiene);

//Eliminar un Tiene
router.delete('/:tieneCodeSintoma/:tieneDenomOMS', TieneC.deleteTiene);
