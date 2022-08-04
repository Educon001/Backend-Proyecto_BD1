import {Estado} from '../Entities';
import {db} from '../Config/db';
import {QueryResult} from 'pg';
import {Request, Response} from 'express';

//get all Personas.
export async function getEstados(req: Request, res: Response) {
   try {
      let results = await db().query(`SELECT *
                                    FROM estado_provincia
                                    ORDER BY codepais, code`) as QueryResult<Estado>;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Crear estado
export async function createEstado(req: Request, res: Response) {
   console.info('Attempting to create estado with input', req.body);
   let estado = new Estado(req.body.name, req.body.codepais);
   try {
      console.time(`Inserted state with name ${estado.name}`);
      await db().
          query('INSERT INTO estado_provincia VALUES (default, $1, $2)',
              [estado.name, estado.codePais]);
      console.timeEnd(`Inserted state with name ${estado.name}`);
      return res.json(estado);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Actualizar estado
export async function updateEstado(req: Request, res: Response) {
   let {estadoCode} = req.params;
   let estado = new Estado(req.body.name, req.body.codepais,
       parseInt(estadoCode));
   try {
      await db().query(`UPDATE estado_provincia
                      SET Name=$2,
                          codePais=$3
                      WHERE code = $1`,
          [estado.code, estado.name, estado.codePais]);
      return res.json(estado);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Borrar persona
export async function deleteEstado(req: Request, res: Response) {
   let {estadoCode} = req.params;
   try {
      await db().query(`DELETE
                      FROM estado_provincia
                      WHERE code = $1`, [estadoCode]);
      return res.json({message: 'ok'});
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};