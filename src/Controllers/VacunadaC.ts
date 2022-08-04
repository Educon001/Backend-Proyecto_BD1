import {Vacunada} from '../Entities';

import {db} from '../Config/db';
import {QueryResult} from 'pg';
import {Request, Response} from 'express';

//get all Paises.
export async function getVacunados(req: Request, res: Response) {
   try {
      let results = await db().query(`SELECT *
                                    FROM vacunada
                                    ORDER BY idpersona,datevacuna`) as QueryResult<Vacunada>;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Crear pais
/* public idPersona: string,
      public cadoVacuna: number,
      public codeCentroSalud: number,
      public idPersonal: string,
      public dateVacuna: Date,
      public dosis: number,*/
export async function createVacunado(req: Request, res: Response) {
   console.info('Attempting to create vacunado with input', req.body);
   let vacunada = new Vacunada(req.body.idpersona,
       parseInt(req.body.codevacuna),
       parseInt(req.body.codecv), req.body.idpersonal,
       new Date(req.body.datevacuna), parseInt(req.body.dosis));
   try {
      console.time(
          `Inserted vacunada with code ${vacunada.idPersona, vacunada.codeVacuna, vacunada.codeCentroVacunacion, vacunada.idPersonal, vacunada.dateVacuna}`);
      await db().
          query('INSERT INTO vacunada VALUES ($1, $2, $3, $4, $5, $6)',
              [
                 vacunada.idPersona,
                 vacunada.codeVacuna,
                 vacunada.codeCentroVacunacion,
                 vacunada.idPersonal,
                 vacunada.dateVacuna,
                 vacunada.dosis]);
      console.timeEnd(
          `Inserted vacunada with code ${vacunada.idPersona, vacunada.codeVacuna, vacunada.codeCentroVacunacion, vacunada.idPersonal, vacunada.dateVacuna}`);
      return res.json(vacunada);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Actualizar vacunado
export async function updateVacunado(req: Request, res: Response) {

   let {
      vacunadaPersonaId,
      vacunadaCodeVacuna,
      vacunadaCodeCentro,
      vacunadaIdPersonal,
      vacunadaDateVacuna,
   } = req.params;
   let vacunada = new Vacunada(vacunadaPersonaId, parseInt(vacunadaCodeVacuna),
       parseInt(vacunadaCodeCentro), vacunadaIdPersonal,
       new Date(vacunadaDateVacuna), parseInt(req.body.dosis));
   try {
      await db().query(`UPDATE vacunada
                      SET dosis=$6
                      WHERE idpersona = $1
                        and CodeVacuna = $2
                        and codecentrov = $3
                        and idpersonal = $4
                        and datevacuna = $5
        `,

          [
             vacunada.idPersona,
             vacunada.codeVacuna,
             vacunada.codeCentroVacunacion,
             vacunada.idPersonal,
             vacunada.dateVacuna,
             vacunada.dosis]);
      return res.json(vacunada);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

//Borrar persona
export async function deleteVacunado(req: Request, res: Response) {
   let {
      vacunadaPersonaId,
      vacunadaCodeVacuna,
      vacunadaCodeCentro,
      vacunadaIdPersonal,
      vacunadaDateVacuna,
   } = req.params;
   try {
      await db().query(`DELETE
                      FROM vacunada
                      WHERE idpersona = $1
                        and codevacuna = $2
                        and codecentrov = $3
                        and idPersonal = $4
                        and datevacuna = $5`, [
         vacunadaPersonaId,
         vacunadaCodeVacuna,
         vacunadaCodeCentro,
         vacunadaIdPersonal,
         vacunadaDateVacuna]);
      return res.json({message: 'ok'});
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};