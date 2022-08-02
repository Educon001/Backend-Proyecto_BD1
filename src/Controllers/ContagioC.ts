import {Contagio} from '../Entities';

import {db} from '../Config/db';
import {QueryResult} from 'pg';
import {Request, Response} from 'express';

//get all Contagiado
export async function getContagiado(req: Request, res: Response) {
   try {
      let results = await db().query(`SELECT *
                                    FROM contagio`) as QueryResult<Contagio>;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Crear contagiado

export async function createContagiado(req: Request, res: Response) {
   console.info('Attempting to create contagiado with input', req.body);
   let contagio = new Contagio(req.body.idpersona, req.body.denom_oms,
       new Date(req.body.datecontagio), parseInt(req.body.resttime),
       req.body.casahospitalizado);
   try {
      console.time(
          `Inserted  with code ${contagio.idPersona, contagio.denomOMS, contagio.dateContagio}`);
      await db().
          query('INSERT INTO contagio VALUES ($1, $2, $3, $4, $5)',
              [
                 contagio.idPersona,
                 contagio.denomOMS,
                 contagio.dateContagio,
                 contagio.restTime,
                 contagio.casaHospitalizado,
              ]);
      console.timeEnd(
          `Inserted contagio with code ${contagio.idPersona, contagio.denomOMS, contagio.dateContagio}`);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Actualizar Contagio
export async function updateContagiado(req: Request, res: Response) {

   let {
      contagioPersonaId,
      contagioDenomOMS,
      contagioFechaContagio,
   } = req.params;
   let contagio = new Contagio(contagioPersonaId, contagioDenomOMS,
       new Date(contagioFechaContagio), parseInt(req.body.resttime),
       req.body.casahospitalizado);
   try {
      await db().query(`UPDATE contagio
                      SET resttime=$5,
                          casahospitalizado=$6
                      WHERE idpersona = $1
                        and denom_oms = $2
                        and datecontagio = $3
        `,

          [
             contagio.idPersona,
             contagio.denomOMS,
             contagio.dateContagio,
             contagio.restTime,
             contagio.casaHospitalizado]);
      return res.json(contagio);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Borrar contagio
export async function deleteContagiado(req: Request, res: Response) {
   let {
      contagioPersonaId,
      contagioDenomOMS,
      contagioFechaContagio,
   } = req.params;
   try {
      await db().query(`DELETE
                      FROM contagio
                      WHERE idpersona = $1
                        and denom_oms = $2
                        and datecontagio = $3
    `, [
         contagioPersonaId,
         contagioDenomOMS,
         contagioFechaContagio]);
      return res.json({message: 'ok'});
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};