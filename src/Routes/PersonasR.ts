import express from 'express';
import {Persona} from '../Entities';
import {PersonaC} from "../Controllers/PersonaC";

const router = express.Router();

//Get Personas.
router.get('/personas', async (req, res) => {
    let personas = await new PersonaC().getPersonas();
    return res.json(personas)
});

//Crear una Persona.
router.post('/persona/add/:ID/:name/:lastName/:sex/:birthdate/:highRisk', async (req, res) => {
    let p = new Persona(req.params.ID, req.params.name, req.params.lastName, req.params.sex, new Date(req.params.birthdate), req.params.highRisk=='true');
    await new PersonaC().createPersona(p);
});

//Actualizar una Persona.
router.put('/personas', async (req, res) => {
    let p = new Persona(req.body.ID, req.body.name, req.body.lastName, req.body.sex, req.body.birthdate, req.body.highRisk);
    await new PersonaC().updatePersona(p);
    let personas = await new PersonaC().getPersonas();
});

//Eliminar una Persona
router.delete('/personas/:personaId', async (req, res) => {
    let {personaId} = req.params;
    await new PersonaC().deletePersona(personaId);
    let personas = await new PersonaC().getPersonas();
});

module.exports = router;