import {Eficacia} from '../Entities';

import {db} from '../Config/db';
import {QueryResult} from 'pg';
import {Request, Response} from 'express';

//get all Eficacia
export async function getEficacia(req: Request, res: Response) {
   try {
      let results = await db().query(`SELECT *
                                    FROM eficacia`) as QueryResult<Eficacia>;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Crear Eficacia

export async function createEficacia(req: Request, res: Response) {
   console.info('Attempting to create contagiado with input', req.body);
   let eficacia = new Eficacia(req.body.denom_oms,
       parseInt(req.body.codevacuna),
       parseFloat(req.body.percentage));
   try {
      console.time(
          `Inserted  with code ${eficacia.denomOMS, eficacia.codeVacuna}`);
      await db().
          query('INSERT INTO contagio VALUES ($1, $2, $3)',
              [
                 eficacia.denomOMS,
                 eficacia.codeVacuna,
                 eficacia.percentage,
              ]);
      console.timeEnd(
          `Inserted eficacia with code ${eficacia.denomOMS, eficacia.codeVacuna}`);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Actualizar Eficacia
export async function updateEficacia(req: Request, res: Response) {

   let {
      eficaciaDenomOMS,
      eficaciaCodeVacuna,
   } = req.params;
   let eficacia = new Eficacia(eficaciaDenomOMS, parseInt(eficaciaCodeVacuna),
       parseFloat(req.body.percentage));
   try {
      await db().query(`UPDATE eficacia
                      SET percentage=$5
                      WHERE denom_oms = $1
                        and codevacuna = $2
        `,

          [
             eficacia.denomOMS,
             eficacia.codeVacuna,
             eficacia.percentage]);
      return res.json(eficacia);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Borrar eficacia
export async function deleteEficacia(req: Request, res: Response) {
   let {
      eficaciaDenomOMS,
      eficaciaCodeVacuna,
   } = req.params;
   try {
      await db().query(`DELETE
                      FROM eficacia
                      WHERE denom_oms = $1
                        and codevacuna = $2
    `, [
         eficaciaDenomOMS,
         eficaciaCodeVacuna]);
      return res.json({message: 'ok'});
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};