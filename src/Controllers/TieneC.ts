import {Reside, Tiene} from '../Entities';

import {db} from '../Config/db';
import {QueryResult} from 'pg';
import {Request, Response} from 'express';

//get all Tiene
export async function getTiene(req: Request, res: Response) {
   try {
      let results = await db().query(`SELECT *
                                    FROM tiene`) as QueryResult<Tiene>;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//get Reside por persona.
export async function getTieneVirus(req: Request, res: Response) {
   let {tieneVirus} = req.params;
   try {
      let results = await db().
          query(`SELECT si.code, si.description
                 FROM tiene t 
                          join sintoma_efecto si  on si.code=t.codesintoma
                 WHERE t.denom_oms = $1`,
              [tieneVirus]) as QueryResult<Tiene>;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Crear Tiene

export async function createTiene(req: Request, res: Response) {
   console.info('Attempting to create tiene with input', req.body);
   let tiene = new Tiene(parseInt(req.body.codesintoma), req.body.denom_oms);
   try {
      console.time(
          `Inserted tiene with code ${tiene.codeSintoma, tiene.denomOMS}`);
      await db().
          query('INSERT INTO tiene VALUES ($1, $2)',
              [
                 tiene.codeSintoma,
                 tiene.denomOMS
                  ]);
      console.timeEnd(
          `Inserted tiene with code ${tiene.codeSintoma, tiene.denomOMS}`);
      return res.json(tiene);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Actualizar tiene
export async function updateTiene(req: Request, res: Response) {

   let {
      tieneCodeSintoma,
      tieneDenomOMS,
   } = req.params;
   let tiene = new Tiene(parseInt(tieneCodeSintoma), tieneDenomOMS);
   try {
      await db().query(`UPDATE tiene
                      SET codesintoma=$1
                      WHERE codesintoma=$1
                        and denom_oms=$2
        `,

          [
             tiene.codeSintoma,
             tiene.denomOMS]);
      return res.json(tiene);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Borrar Tiene
export async function deleteTiene(req: Request, res: Response) {
   let {
      tieneCodeSintoma,
      tieneDenomOMS,
   } = req.params;
   try {
      await db().query(`DELETE
                      FROM tiene
                      WHERE codesintoma=$1
                        and denom_oms=$2
                      `, [
         tieneCodeSintoma,
         tieneDenomOMS]);
      return res.json({message: 'ok'});
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};