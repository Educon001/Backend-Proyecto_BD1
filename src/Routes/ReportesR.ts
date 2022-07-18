import express from 'express';
import * as ReportesC from '../Controllers/ReportesC';

export const router = express.Router();

/* 2. El porcentaje de personas vacunadas por centro de vacunación que han estado
contagiados con el virus luego de ser vacunados. */
router.get('/2', ReportesC.Reporte2);

router.get('/6', ReportesC.Reporte6);

router.get('/7', ReportesC.Reporte7);

router.get('/8', ReportesC.Reporte8);

router.get('/9', ReportesC.Reporte9);