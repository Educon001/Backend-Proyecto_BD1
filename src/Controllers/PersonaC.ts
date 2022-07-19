import {Persona, PersonalSalud, Paciente} from '../Entities';
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

export async function getPersonalSalud(req: Request, res: Response) {
   try {
      let results = await db().query(`SELECT P.*, PS.Email, PS.type
                                    FROM Persona P
                                             JOIN Personal_Salud PS
                                                  ON P.ID = PS.ID_Persona`) as QueryResult<PersonalSalud>;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

export async function getPacientes(req: Request, res: Response) {
   try {
      let results = await db().query(`SELECT P.*
                                    FROM Persona P
                                             JOIN Paciente PA
                                                  ON P.ID = PA.ID_Persona`) as QueryResult<PersonalSalud>;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Crear persona.
export async function createPersona(req: Request, res: Response) {
   console.info('Attempting to create person with input', req.body);
   let p = new Persona(req.body.id, req.body.name, req.body.lastname,
       req.body.sex, new Date(req.body.birthdate),
       req.body.highrisk);
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

//Crear personal salud.
export async function createPersonalSalud(req: Request, res: Response) {
   console.info('Attempting to create health personnel with input', req.body);
   try {
   let persona = await db().
       query(`SELECT *
             FROM Persona
             WHERE id = $1`, [req.body.id_persona]) as QueryResult<Persona>;
   let ps = new PersonalSalud(req.body.email, req.body.type, persona.rows[0].id,
       persona.rows[0].name, persona.rows[0].lastName, persona.rows[0].sex,
       persona.rows[0].birthdate, persona.rows[0].highRisk);
      console.time(`Inserted health personnel with id ${ps.id}`);
      await db().
          query('INSERT INTO Personal_Salud VALUES ($1, $2, $3)',
              [ps.id, ps.email, ps.type]);
      console.timeEnd(`Inserted health personnel with id ${ps.id}`);
      return res.json(ps);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Actualizar persona
export async function updatePersona(req: Request, res: Response) {
   let {personaId} = req.params;
   let p = new Persona(personaId, req.body.name, req.body.lastname,
       req.body.sex, new Date(req.body.birthdate), req.body.highrisk);
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

//Actualizar personal salud
export async function updatePersonalSalud(req: Request, res: Response) {
   let {personalId} = req.params;
   try {
      await db().query(`UPDATE Personal_Salud
                      SET Email=$2,
                          Type=$3
                      WHERE id_persona = $1`,
          [personalId, req.body.email, req.body.type]);
      return res.json(
          {id_persona: personalId, email: req.body.email, type: req.body.type});
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

//Borrar personal Salud
export async function deletePersonalSalud(req: Request, res: Response) {
   let {personalId} = req.params;
   try {
      await db().query(`DELETE
                      FROM Personal_Salud
                      WHERE id_persona = $1`, [personalId]);
      return res.json({message: 'ok'});
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad request'});
   }
};

//Borrar personal Salud
export async function deletePaciente(req: Request, res: Response) {
   let {pacienteId} = req.params;
   try {
      await db().query(`DELETE
                      FROM Paciente
                      WHERE id_persona = $1`, [pacienteId]);
      return res.json({message: 'ok'});
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad request'});
   }
};
