import express from 'express';
import * as ResideC from '../Controllers/ResideC';

export const router = express.Router();

//Get Residente
router.get('/', ResideC.getResidente);

//Get Residente por persona
router.get('/:residePersona', ResideC.getResidentePersona);

//Crear un Residente
router.post('/', ResideC.createResidente);

//Actualizar un Residente
router.put('/:resideCodeProvincia/:resideIdPersona/:resideFechaReside',
    ResideC.updateResidente);

//Eliminar un Residente
router.delete('/:resideCodeProvincia/:resideIdPersona/:resideFechaReside',
    ResideC.deleteResidente);
