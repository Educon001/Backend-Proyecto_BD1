import {Hospitalizado} from '../Entities';

import {db} from '../Config/db';
import {QueryResult} from 'pg';
import {Request, Response} from 'express';

//get all Hospitalizado
export async function getHospitalizado(req: Request, res: Response) {
  try {
    let results = await db().query(`SELECT *
                                    FROM hospitalizado`) as QueryResult<Hospitalizado>;
    return res.json(results.rows);
  } catch (e) {
    console.error(e);
    return res.status(400).json({message: 'Bad Request'});
  }
};

//Crear Hospitalizado

export async function createHospitalizado(req: Request, res: Response) {
  console.info('Attempting to create residente with input', req.body);
  let hospitalizado = new Hospitalizado(req.body.idpaciente,
      parseInt(req.body.codecentroh), new Date(req.body.datehospitalizado));
  try {
    console.time(
        `Inserted hospitalizado with code ${hospitalizado.idPaciente, hospitalizado.codeCentroH, hospitalizado.dateHospitalizado}`);
    await db().
        query('INSERT INTO hospitalizado VALUES ($1, $2, $3)',
            [
              hospitalizado.idPaciente,
              hospitalizado.codeCentroH,
              hospitalizado.dateHospitalizado]);
    console.timeEnd(
        `Inserted hospitalizado with code ${hospitalizado.idPaciente, hospitalizado.codeCentroH, hospitalizado.dateHospitalizado}`);
    return res.json(hospitalizado);
  } catch (e) {
    console.error(e);
    return res.status(400).json({message: 'Bad Request'});
  }
};

//Actualizar hospitalizado
export async function updateHospitalizado(req: Request, res: Response) {

  let {
    hospitalizadoIdPaciente,
    hospitalizadoCodeCentroH,
    hospitalizadoDateHospitalizado,

  } = req.params;
  let hospitalizado = new Hospitalizado(hospitalizadoIdPaciente,
      parseInt(hospitalizadoCodeCentroH),
      new Date(hospitalizadoDateHospitalizado));
  try {
    await db().query(`UPDATE hospitalizado
                      SET codecentroh=$1
                      WHERE idpaciente=$1
                        and codecentroh=$2
                        and datehospitalizado=$3`,
        [
          hospitalizado.idPaciente,
          hospitalizado.codeCentroH,
          hospitalizado.dateHospitalizado,
        ]);
    return res.json(hospitalizado);
  } catch (e) {
    console.error(e);
    return res.status(400).json({message: 'Bad Request'});
  }
};

//Borrar hospitalizado
export async function deleteHospitalizado(req: Request, res: Response) {
  let {
    hospitalizadoIdPaciente,
    hospitalizadoCodeCentroH,
    hospitalizadoDateHospitalizado,
  } = req.params;
  try {
    await db().query(`DELETE
                      FROM hospitalizado
                      WHERE idpaciente=$1
                        and codecentroh=$2
                        and datehospitalizado=$3
                      `, [
      hospitalizadoIdPaciente,
      hospitalizadoCodeCentroH,
      hospitalizadoDateHospitalizado]);
    return res.json({message: 'ok'});
  } catch (e) {
    console.error(e);
    return res.status(400).json({message: 'Bad Request'});
  }
};