import express from 'express';
import * as ContagioC from '../Controllers/ContagioC';

export const router = express.Router();

//Get Contagiados
router.get('/', ContagioC.getContagiado);

//Get Contagios por Persona
router.get('/:contagiadoPersona', ContagioC.getContagiadoPersona);

//Crear un contagiado
router.post('/', ContagioC.createContagiado);

//Actualizar un Contaciado
router.put('/:contagioPersonaId/:contagioDenomOMS/:contagioFechaContagio',
    ContagioC.updateContagiado);

//Eliminar una Persona
router.delete('/:contagioPersonaId/:contagioDenomOMS/:contagioFechaContagio',
    ContagioC.deleteContagiado);
