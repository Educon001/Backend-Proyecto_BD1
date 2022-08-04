import express from 'express';
import * as ReportesC from '../Controllers/ReportesC';

export const router = express.Router();

router.get('/1', ReportesC.Reporte1);

router.get('/2', ReportesC.Reporte2);

router.get('/3', ReportesC.Reporte3);

router.get('/4', ReportesC.Reporte4);

router.get('/5', ReportesC.Reporte5);

router.get('/6', ReportesC.Reporte6);

router.get('/7', ReportesC.Reporte7);

router.get('/8', ReportesC.Reporte8);

router.get('/9', ReportesC.Reporte9);