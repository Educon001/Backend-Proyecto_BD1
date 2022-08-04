import {Vacuna} from '../Entities';
import {db} from '../Config/db';
import {QueryResult} from 'pg';
import {Request, Response} from 'express';

//get all Vacuna
export async function getVacuna(req: Request, res: Response) {
   try {
      let results = await db().query(`SELECT *
                                    FROM vacuna
                                    ORDER BY code`) as QueryResult<Vacuna>;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Crear vacuna
export async function createVacuna(req: Request, res: Response) {
   console.info('Attempting to create vacuna with input', req.body);
   let vacuna = new Vacuna(req.body.name, parseInt(req.body.lote),
       parseInt(req.body.cantdosis), req.body.type, req.body.laboratory,
       parseInt(req.body.code_pais));
   try {
      console.time(`Inserted vacuna with name ${vacuna.name}`);
      await db().
          query('INSERT INTO vacuna VALUES (default, $1, $2, $3, $4, $5, $6)',
              [
                 vacuna.name,
                 vacuna.lote,
                 vacuna.cantDosis,
                 vacuna.type,
                 vacuna.laboratory,
                 vacuna.code_Pais]);
      console.timeEnd(`Inserted vacuna with name ${vacuna.name}`);
      return res.json(vacuna);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Actualizar vacuna
export async function updateVacuna(req: Request, res: Response) {

   let {vacunaCode} = req.params;
   let vacuna = new Vacuna(req.body.name, parseInt(req.body.lote),
       parseInt(req.body.cantdosis), req.body.type, req.body.laboratory,
       parseInt(req.body.code_pais), parseInt(vacunaCode));
   try {
      await db().query(`UPDATE vacuna
                      SET name=$2,
                          lote=$3,
                          cantDosis=$4,
                          type=$5,
                          laboratory=$6,
                          code_pais=$7
                      WHERE code = $1
        `,
          [
             vacuna.code,
             vacuna.name,
             vacuna.lote,
             vacuna.cantDosis,
             vacuna.type,
             vacuna.laboratory,
             vacuna.code_Pais]);
      return res.json(vacuna);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Borrar vacuna
export async function deleteVacuna(req: Request, res: Response) {
   let {vacunaCode} = req.params;
   try {
      await db().query(`DELETE
                      FROM vacuna
                      WHERE code = $1 `, [parseInt(vacunaCode)])
      ;
      return res.json({message: 'ok'});
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};