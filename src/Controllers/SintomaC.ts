import {Sintoma, Tratamiento} from '../Entities';
import {db} from '../Config/db';
import {QueryResult} from 'pg';
import {Request, Response} from 'express';

//get all sintoma
export async function getSintoma(req: Request, res: Response) {
   try {
      let results = await db().query(`SELECT *
                                      FROM sintoma_efecto
                                      ORDER BY code`) as QueryResult<Sintoma>;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Crear Sintoma
export async function createSintoma(req: Request, res: Response) {
   console.info('Attempting to create sintoma with input', req.body);
   let sintoma = new Sintoma(req.body.description);
   try {
      console.time(`Inserted sintoma with name ${sintoma.description}`);
      await db().
          query('INSERT INTO vacuna VALUES (default, $1)',
              [
                 sintoma.description]);
      console.timeEnd(`Inserted sintoma with name ${sintoma.description}`);
      return res.json(sintoma);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Actualizar sintoma
export async function updateSintoma(req: Request, res: Response) {

   let {sintomaCode} = req.params;
   let sintoma = new Sintoma(req.body.description, parseInt(sintomaCode));
   try {
      await db().query(`UPDATE sintoma_efecto
                        SET description=$2
                        WHERE code = $1
          `,
          [
             sintoma.code,
             sintoma.description,
          ]);
      return res.json(sintoma);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Borrar sintoma
export async function deleteSintoma(req: Request, res: Response) {
   let {sintomaCode} = req.params;
   try {
      await db().query(`DELETE
                        FROM sintoma_efecto
                        WHERE code = $1 `, [parseInt(sintomaCode)])
      ;
      return res.json({message: 'ok'});
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};