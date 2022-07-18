import {Tratamiento} from '../Entities';
import {db} from '../Config/db';
import {QueryResult} from 'pg';
import {Request, Response} from 'express';

//get all Tratamiento
export async function getTratamiento(req: Request, res: Response) {
   try {
      let results = await db().query(`SELECT *
                                    FROM tratamiento`) as QueryResult<Tratamiento>;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Crear Tratamiento
export async function createTratamiento(req: Request, res: Response) {
   console.info('Attempting to create tratamiento with input', req.body);
   let tratamiento = new Tratamiento(req.body.description);
   try {
      console.time(`Inserted tratamiento with name ${tratamiento.description}`);
      await db().
          query('INSERT INTO vacuna VALUES (default, $1)',
              [
                 tratamiento.description]);
      console.timeEnd(
          `Inserted tratamiento with name ${tratamiento.description}`);
      return res.json(tratamiento);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Actualizar tratamiento
export async function updateTratamiento(req: Request, res: Response) {

   let {tratamientoCode} = req.params;
   let tratamiento = new Tratamiento(req.body.description,
       parseInt(tratamientoCode));
   try {
      await db().query(`UPDATE tratamiento
                      SET description=$2
                      WHERE code = $1
        `,
          [
             tratamiento.code,
             tratamiento.description,
          ]);
      return res.json(tratamiento);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Borrar tratamiento
export async function deleteTratamiento(req: Request, res: Response) {
   let {tratamientoCode} = req.params;
   try {
      await db().query(`DELETE
                      FROM tratamiento
                      WHERE code = $1 `, [parseInt(tratamientoCode)])
      ;
      return res.json({message: 'ok'});
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};