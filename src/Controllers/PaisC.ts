import {Pais} from '../Entities';

import {db} from '../Config/db';
import {QueryResult} from 'pg';
import {Request, Response} from 'express';

//get all Paises.
export async function getPaises(req: Request, res: Response) {
   try {
      let results = await db().query(`SELECT *
                                    FROM Pais
                                    ORDER BY code`) as QueryResult<Pais>;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Crear pais
export async function createPais(req: Request, res: Response) {
   console.info('Attempting to create pais with input', req.body);
   let pais = new Pais(req.body.name);
   try {
      console.time(`Inserted country with name ${pais.name}`);
      await db().
          query('INSERT INTO pais VALUES (default, $1)',
              [pais.name]);
      console.timeEnd(`Inserted country with name ${pais.name}`);
      return res.json(pais);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Actualizar pais
export async function updatePais(req: Request, res: Response) {

   let {paisCode} = req.params;
   let pais = new Pais(req.body.name, parseInt(paisCode));
   try {
      await db().query(`UPDATE pais
                      SET Name=$2
                      WHERE code = $1`,
          [pais.code, pais.name]);
      return res.json(pais);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Borrar persona
export async function deletePersona(req: Request, res: Response) {
   let {paisCode} = req.params;
   try {
      await db().query(`DELETE
                      FROM pais
                      WHERE code = $1`, [paisCode]);
      return res.json({message: 'ok'});
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};