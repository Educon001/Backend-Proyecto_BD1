import express from 'express';
import * as TratamientoC from '../Controllers/TratamientoC';
import {Tratamiento} from '../Entities';

export const router = express.Router();

//Get tratamiento.
router.get('/', TratamientoC.getTratamiento);

//Crear un tratamiento .
router.post('/', TratamientoC.createTratamiento);

//Actualizar un tratamiento.
router.put('/:tratamientoCode', TratamientoC.updateTratamiento);

//Eliminar un tratamiento
router.delete('/:tratamientoCode', TratamientoC.deleteTratamiento);
