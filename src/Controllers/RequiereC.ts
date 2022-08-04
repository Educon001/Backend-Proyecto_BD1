import {Requiere} from '../Entities';

import {db} from '../Config/db';
import {QueryResult} from 'pg';
import {Request, Response} from 'express';

//get all Requiere
export async function getRequiere(req: Request, res: Response) {
   try {
      let results = await db().query(`SELECT *
                                      FROM requiere`) as QueryResult<Requiere>;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//get Requiere por paciente
export async function getRequierePaciente(req: Request, res: Response) {
   let {requierePaciente} = req.params;
   try {
      let results = await db().
          query(`SELECT r.codetratamiento, t.description, r.date, r.estado
                 FROM requiere r
                          join tratamiento t on t.code = r.codetratamiento
                 WHERE idpaciente = $1
                 ORDER BY r.date`,
              [requierePaciente]) as QueryResult<Requiere>;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Crear Requiere

export async function createRequiere(req: Request, res: Response) {
   console.info('Attempting to create residente with input', req.body);
   let requiere = new Requiere(parseInt(req.body.codetratamiento),
       req.body.idpaciente, new Date(req.body.date), req.body.estado);
   try {
      console.time(
          `Inserted residente with code ${requiere.codeTratamiento, requiere.idPaciente, requiere.date, requiere.estado}`);
      await db().
          query('INSERT INTO requiere VALUES ($1, $2, $3, $4)',
              [
                 requiere.codeTratamiento,
                 requiere.idPaciente,
                 requiere.date,
                 requiere.estado]);
      console.timeEnd(
          `Inserted requiere with code ${requiere.codeTratamiento, requiere.idPaciente, requiere.date, requiere.estado}`);
      return res.json(requiere);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Actualizar requiere
export async function updateRequiere(req: Request, res: Response) {

   let {
      requiereCodeTratamiento,
      requiereidPaciente,
      requiereDate,
   } = req.params;
   let requiere = new Requiere(parseInt(req.body.codetratamiento),
       requiereidPaciente, new Date(requiereDate), req.body.estado);
   try {
      await db().query(`UPDATE requiere
                        SET codetratamiento=$5,
                            estado=$4
                        WHERE codetratamiento = $1
                          and idpaciente = $2
                          and date = $3 `,
          [
             requiereCodeTratamiento,
             requiere.idPaciente,
             requiere.date,
             requiere.estado,
             requiere.codeTratamiento
          ]);
      return res.json(requiere);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Borrar resquiere
export async function deleteRequiere(req: Request, res: Response) {
   let {
      requiereCodeTratamiento,
      requiereidPaciente,
      requiereDate,
   } = req.params;
   try {
      await db().query(`DELETE
                        FROM requiere
                        WHERE codetratamiento = $1
                          and idpaciente = $2
                          and date = $3
      `, [
         requiereCodeTratamiento,
         requiereidPaciente,
         requiereDate]);
      return res.json({message: 'ok'});
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};