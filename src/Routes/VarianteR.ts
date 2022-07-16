import express from 'express';
import * as VarianteC from '../Controllers/VarianteC';
import {Variante} from '../Entities';

export const router = express.Router();

//Get variante
router.get('/', VarianteC.getVariante);

//Crear una variante
router.post('/', VarianteC.createVariante);

//Actualizar una variante
router.put('/:varianteDenomOms', VarianteC.updateVariante);

//Eliminar una variante
router.delete('/:varianteDenomOms', VarianteC.deleteVariante);
