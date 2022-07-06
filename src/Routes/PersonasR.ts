import express , {Request, Response} from 'express';
import { Persona } from '../Entities';
const router = express.Router();
const PersonaC = require('../Controllers/PersonaC');

//Get Personas.
router.get('/', async (req,res) => {
    let personas = await new PersonaC().getPersonas();
    console.log(personas);
    return res.json(personas)
});

//Crear una Persona.
router.post('/persona', async (req,res) => {
    let p = new Persona(req.body.ID, req.body.name, req.body.lastName, req.body.sex,req.body.birthdate, req.body.highRisk);
    await new PersonaC().createPersona(p,res);
});

//Actualizar una Persona.
router.put('/personas', async (req,res) => {
    let p = new Persona(req.body.ID, req.body.name, req.body.lastName, req.body.sex,req.body.birthdate, req.body.highRisk);
    await new PersonaC().updatePersona(p,res);
    let personas = await new PersonaC().getPersonas();
});

//Eliminar una Persona
router.delete('/personas/:personaId', async (req,res) => {
    let {personaId} = req.params;
    await new PersonaC().deletePersona(personaId);
    let personas = await new PersonaC().getPersonas();
});

module.exports = router;