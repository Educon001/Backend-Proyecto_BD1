import {Asignado, Presenta} from '../Entities';

import {db} from '../Config/db';
import {QueryResult} from 'pg';
import {Request, Response} from 'express';

//get all Presenta
export async function getPresenta(req: Request, res: Response) {
   try {
      let results = await db().query(`SELECT *
                                      FROM presenta`) as QueryResult<Presenta>;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

export async function getPresentaVacuna(req: Request, res: Response) {
   let {presentaCodeVacuna} = req.params;
   try {
      let results = await db().
          query(`SELECT p.codesintoma, si.description
                 FROM presenta p
                          join sintoma_efecto si on si.code = p.codesintoma
                 WHERE p.codevacuna = $1
                 ORDER BY p.codesintoma`,
              [presentaCodeVacuna]) as QueryResult<Presenta>;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Crear presenta

export async function createPresenta(req: Request, res: Response) {
   console.info('Attempting to create presenta with input', req.body);
   let presenta = new Presenta(parseInt(req.body.codevacuna),
       parseInt(req.body.codesintoma));
   try {
      console.time(
          `Inserted presenta with code ${presenta.codeVacuna, presenta.codeSintoma}`);
      await db().
          query('INSERT INTO presenta VALUES ($1, $2)',
              [
                 presenta.codeVacuna,
                 presenta.codeSintoma]);
      console.timeEnd(
          `Inserted presenta with code ${presenta.codeVacuna, presenta.codeSintoma}`);
      return res.json(presenta);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Actualizar presenta
export async function updatePresenta(req: Request, res: Response) {

   let {
      presentaCodeVacuna,
      presentaCodeSintoma,
   } = req.params;
   let presenta = new Presenta(parseInt(presentaCodeVacuna),
       parseInt(req.body.codesintoma));
   try {
      await db().query(`UPDATE presenta
                        SET codesintoma=$3
                        WHERE codevacuna = $1
                          and codesintoma = $2
          `,

          [
             presenta.codeVacuna,
             presentaCodeSintoma,
             presenta.codeSintoma]);
      return res.json(presenta);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Borrar Presenta
export async function deletePresenta(req: Request, res: Response) {
   let {
      presentaCodeVacuna,
      presentaCodeSintoma,
   } = req.params;
   try {
      await db().query(`DELETE
                        FROM presenta
                        WHERE codesintoma = $1
                          and codevacuna = $2
      `, [
         presentaCodeSintoma,
         presentaCodeVacuna]);
      return res.json({message: 'ok'});
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};