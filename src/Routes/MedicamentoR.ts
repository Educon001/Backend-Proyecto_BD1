import express from 'express';
import * as MedicamentoC from '../Controllers/MedicamentoC';

export const router = express.Router();

//Get medicamento.
router.get('/', MedicamentoC.getMedicamento);

//Crear una medicamento.
router.post('/', MedicamentoC.createMedicamento);

//Actualizar una medicamento.
router.put('/:medicamentoCode', MedicamentoC.updateMedicamento);

//Eliminar una medicamento
router.delete('/:medicamentoCode', MedicamentoC.deleteMedicamento);
