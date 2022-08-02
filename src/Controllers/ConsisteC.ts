import {Consiste} from '../Entities';

import {db} from '../Config/db';
import {QueryResult} from 'pg';
import {Request, Response} from 'express';

//get all Consiste
export async function getConsiste(req: Request, res: Response) {
   try {
      let results = await db().query(`SELECT *
                                      FROM consiste`) as QueryResult<Consiste>;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//get Consiste por tratamiento
export async function getConsisteTratamiento(req: Request, res: Response) {
   let {consisteTratamiento} = req.params;
   try {
      let results = await db().query(`SELECT c.CodeMedicamento,
                                             m.name,
                                             m.component,
                                             c.CantDays,
                                             c.Frecuency,
                                             c.Dosis
                                      FROM consiste c
                                               join medicamento m on m.code = c.codemedicamento
                                      WHERE c.codetratamiento = $1`,
          [parseInt(consisteTratamiento)]) as QueryResult<Consiste>;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Crear consiste

export async function createConsiste(req: Request, res: Response) {
   console.info('Attempting to create consiste with input', req.body);
   let consiste = new Consiste(parseInt(req.body.codetratamiento),
       parseInt(req.body.codemedicamento), parseInt(req.body.cantdays),
       req.body.frecuency, parseInt(req.body.dosis));
   try {
      console.time(
          `Inserted consiste with code ${consiste.codeTratamiento, consiste.codeMedicamento}`);
      await db().
          query('INSERT INTO contagio VALUES ($1, $2, $3, $4, $5)',
              [
                 consiste.codeTratamiento,
                 consiste.codeMedicamento,
                 consiste.cantDays,
                 consiste.frecuency,
                 consiste.dosis,
              ]);
      console.timeEnd(
          `Inserted consiste with code ${consiste.codeTratamiento, consiste.codeMedicamento}`);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Actualizar Consiste
export async function updateConsiste(req: Request, res: Response) {

   let {
      consisteTratamiento,
      consisteMedicamento,
   } = req.params;
   let consiste = new Consiste(parseInt(consisteTratamiento),
       parseInt(consisteMedicamento), parseInt(req.body.cantdays),
       req.body.frecuency, parseInt(req.body.dosis));
   try {
      await db().query(`UPDATE consiste
                        SET cantdays=$3,
                            frecuency=$4,
                            dosis=$5
                        WHERE codetratamiento = $1
                          and codemedicamento = $2
          `,

          [
             consiste.codeTratamiento,
             consiste.codeMedicamento,
             consiste.cantDays, consiste.frecuency, consiste.dosis]);
      return res.json(consiste);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Borrar consiste
export async function deleteConsiste(req: Request, res: Response) {
   let {
      consisteTratamiento,
      consisteMedicamento,
   } = req.params;
   try {
      await db().query(`DELETE
                        FROM consiste
                        WHERE codetratamiento = $1
                          and codemedicamento = $2
      `, [
         consisteTratamiento,
         consisteMedicamento]);
      return res.json({message: 'ok'});
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};