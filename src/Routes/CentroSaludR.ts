import express from 'express';
import * as CentroSaludC from '../Controllers/CentroSaludC';

export const router = express.Router();

//Get Centros de Salud
router.get('/', CentroSaludC.getCentrosSalud);
