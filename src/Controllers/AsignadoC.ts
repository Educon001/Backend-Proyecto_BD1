import {Asignado} from '../Entities';

import {db} from '../Config/db';
import {QueryResult} from 'pg';
import {Request, Response} from 'express';

//get all Asignado
export async function getAsignado(req: Request, res: Response) {
   try {
      let results = await db().query(`SELECT *
                                      FROM asignado`) as QueryResult<Asignado>;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

export async function getAsignadoPersona(req: Request, res: Response) {
   let {asignadoPersona} = req.params;
   try {
      let results = await db().
          query(`SELECT c.code, c.name, a.dateasignado
                 FROM asignado a
                          join centro_salud c on a.codecentrosalud = c.code
                 WHERE a.idpersonalsalud = $1`,
              [asignadoPersona]) as QueryResult<Asignado>;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Crear Asignado

export async function createAsignado(req: Request, res: Response) {
   console.info('Attempting to create asignado with input', req.body);
   let asignado = new Asignado(req.body.idpersonalsalud,
       parseInt(req.body.codecentrosalud), new Date(req.body.dateasignado));
   try {
      console.time(
          `Inserted asignado with code ${asignado.idPersonalSalud, asignado.codeCentroSalud, asignado.dateAsignado}`);
      await db().
          query('INSERT INTO asignado VALUES ($1, $2, $3)',
              [
                 asignado.idPersonalSalud,
                 asignado.codeCentroSalud,
                 asignado.dateAsignado,
              ]);
      console.timeEnd(
          `Inserted asignado with code ${asignado.idPersonalSalud, asignado.codeCentroSalud, asignado.dateAsignado}`);
      return res.json(asignado);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Actualizar asignado
export async function updateAsignado(req: Request, res: Response) {

   let {
      asignadoIdPersonalSalud,
      asignadoCodeCentroSalud,
      asignadoDateAsignado,
   } = req.params;
   let asignado = new Asignado(asignadoIdPersonalSalud,
       parseInt(req.body.codecentrosalud), new Date(asignadoDateAsignado));
   try {
      await db().query(`UPDATE asignado
                        SET codecentrosalud=$4
                        WHERE idpersonalsalud = $1
                          and codecentrosalud = $2
                          and dateasignado = $3
          `,

          [
             asignado.idPersonalSalud,
             asignadoCodeCentroSalud,
             asignado.dateAsignado,
             asignado.codeCentroSalud]);
      return res.json(asignado);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Borrar asignado
export async function deleteAsignado(req: Request, res: Response) {
   let {
      asignadoIdPersonalSalud,
      asignadoCodeCentroSalud,
      asignadoDateAsignado,
   } = req.params;
   try {
      await db().query(`DELETE
                        FROM asignado
                        WHERE idpersonalsalud = $1
                          and codecentrosalud = $2
                          and dateasignado = $3
      `, [
         asignadoIdPersonalSalud,
         asignadoCodeCentroSalud,
         asignadoDateAsignado]);
      return res.json({message: 'ok'});
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};