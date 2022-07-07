import {Persona} from '../Entities';
import {db} from '../Config/db';
import {QueryResult} from 'pg';
import {Request, Response} from 'express';

//get all Personas.
export async function getPersonas(req: Request, res: Response) {
  try {
    let results = await db().query(`SELECT *
                                    FROM Persona`) as QueryResult<Persona>;
    return res.json(results.rows);
  } catch (e) {
    console.error(e);
    return res.status(400).json({message: 'Bad Request'});
  }
};

//Crear persona.
export async function createPersona(req: Request, res: Response) {
  console.info('Attempting to create person with input', req.body);
  let p = new Persona(req.body.ID, req.body.name, req.body.lastName,
      req.body.sex, new Date(req.body.birthdate),
      req.body.highRisk);
  try {
    console.time(`Inserted person with id ${p.id}`);
    await db().
        query('INSERT INTO Persona VALUES ($1, $2, $3, $4, $5, $6)',
            [p.id, p.name, p.lastName, p.sex, p.birthdate, p.highRisk]);
    console.timeEnd(`Inserted person with id ${p.id}`);
    return res.json(p);
  } catch (e) {
    console.error(e);
    return res.status(400).json({message: 'Bad Request'});
  }
};

//Actualizar persona
export async function updatePersona(req: Request, res: Response) {
  let {personaId} = req.params;
  let p = new Persona(personaId, req.body.name, req.body.lastName,
      req.body.sex, new Date(req.body.birthdate), req.body.highRisk);
  try {
    await db().query(`UPDATE Persona
                      SET Name=$2,
                          LastName=$3,
                          Sex=$4,
                          Birthdate=$5,
                          HighRisk=$6
                      WHERE id = $1`,
        [p.id, p.name, p.lastName, p.sex, p.birthdate, p.highRisk]);
    return res.json(p);
  } catch (e) {
    console.error(e);
    return res.status(400).json({message: 'Bad Request'});
  }
};

//Borrar persona
export async function deletePersona(req: Request, res: Response) {
  let {personaId} = req.params;
  try {
    await db().query(`DELETE
                      FROM Persona
                      WHERE id = $1`, [personaId]);
    return res.json({message: 'ok'});
  } catch (e) {
    console.error(e);
    return res.status(400).json({message: 'Bad Request'});
  }
};

