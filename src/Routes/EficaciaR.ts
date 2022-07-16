import express from 'express';
import * as EficaciaC from '../Controllers/EficaciaC';

export const router = express.Router();

//Get Eficacia
router.get('/', EficaciaC.getEficacia);

//Crear un Eficacia
router.post('/', EficaciaC.createEficacia);

//Actualizar una Eficacia
router.put('/:eficaciaDenomOMS/:eficaciaCodeVacuna', EficaciaC.updateEficacia);

//Eliminar una Eficacia
router.delete('/:eficaciaDenomOMS/:eficaciaCodeVacuna',
    EficaciaC.deleteEficacia);
