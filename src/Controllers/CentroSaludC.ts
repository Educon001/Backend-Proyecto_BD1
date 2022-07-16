import {CentroHospitalizacion, CentroSalud} from '../Entities';
import {CentroVacunacion} from '../Entities';
import {db} from '../Config/db';
import {QueryResult} from 'pg';
import {Request, Response} from 'express';

//get all CH.
export async function getCentrosHospitalizacion(req: Request, res: Response) {
  try {
    let results = await db().query(`SELECT CS.*
                                    FROM Centro_Salud CS
                                             JOIN Centro_Hospitalizacion CH
                                                  ON CS.code = CH.codecentroh`) as QueryResult<CentroHospitalizacion>;
    return res.json(results.rows);
  } catch (e) {
    console.error(e);
    return res.status(400).json({message: 'Bad Request'});
  }
};

//get all CV.
export async function getCentrosVacunacion(req: Request, res: Response) {
  try {
    let results = await db().query(`SELECT CS.*
                                    FROM Centro_Salud CS
                                             JOIN centro_vacunacion CV
                                                  ON CS.code = CV.codecentrov`) as QueryResult<CentroVacunacion>;
    return res.json(results.rows);
  } catch (e) {
    console.error(e);
    return res.status(400).json({message: 'Bad Request'});
  }
};

//Crear CS
async function createCentroSalud(cs: CentroVacunacion | CentroHospitalizacion): Promise<CentroSalud> {
  let result = await db().
      query(
          `INSERT INTO centro_salud
           VALUES (DEFAULT, $1, $2, $3, $4, $5)
           RETURNING code`,
          [
            cs.name,
            cs.address,
            cs.idMedico,
            cs.codeMunicipio,
            cs.managerDate]) as QueryResult<CentroSalud>;
  return result.rows[0];
};

//Crear CH.
export async function createCentroHospitalizacion(req: Request, res: Response) {
  console.info('Attempting to Hospitalization center with input', req.body);
  let ch = new CentroHospitalizacion(req.body.name, req.body.address,
      req.body.id_medico, req.body.code_municipio,
      new Date(req.body.manager_date));
  try {
    console.time(`Inserted Hospitalization center with name ${ch.name}`);
    const result = await createCentroSalud(ch);
    await db().query(`INSERT INTO centro_hospitalizacion
                      VALUES (${result.code})`);
    console.timeEnd(`Inserted Hospitalization center with name ${ch.name}`);
    return res.json(result);
  } catch (e) {
    console.error(e);
    return res.status(400).json({message: 'Bad Request'});
  }
};

//Crear CV.
export async function createCentroVacunacion(req: Request, res: Response) {
  console.info('Attempting to Vaccination center with input', req.body);
  let cv = new CentroVacunacion(req.body.name, req.body.address,
      req.body.id_medico, req.body.code_municipio,
      new Date(req.body.manager_date));
  try {
    console.time(`Inserted Vaccination center with name ${cv.name}`);
    const result = await createCentroSalud(cv);
    await db().query(`INSERT INTO centro_vacunacion
                      VALUES (${result.code})`);
    console.timeEnd(`Inserted Vaccination center with name ${cv.name}`);
    return res.json(result);
  } catch (e) {
    console.error(e);
    return res.status(400).json({message: 'Bad Request'});
  }
};

//Actualizar CS
export async function updateCentroSalud(req: Request, res: Response) {
  let {csCode} = req.params;
  let cs = new CentroSalud(req.body.name, req.body.address,
      req.body.id_medico, req.body.code_municipio,
      new Date(req.body.manager_date), parseInt(csCode));
  try {
    await db().query(`UPDATE centro_salud
                      SET name           = $2,
                          address        = $3,
                          id_medico      = $4,
                          code_municipio = $5,
                          manager_date   = $6
                      WHERE code = $1`,
        [
          cs.code,
          cs.name,
          cs.address,
          cs.idMedico,
          cs.codeMunicipio,
          cs.managerDate]);
    return res.json(cs);
  } catch (e) {
    console.error(e);
    return res.status(400).json({message: 'Bad Request'});
  }
};

//Borrar CS
async function deleteCentroSalud(csCode: string) {
  await db().query(`DELETE
                    FROM centro_salud
                    WHERE code = ${csCode}`);
  return;
}

//Borrar CV
export async function deleteCentroVacunacion(req: Request, res: Response) {
  let {cvCode} = req.params;
  try {
    await db().query(`DELETE
                      FROM centro_vacunacion
                      WHERE codecentrov = $1`, [cvCode]);
    await deleteCentroSalud(cvCode);
    return res.json({message: 'ok'});
  } catch (e) {
    console.error(e);
    return res.status(400).json({message: 'Bad Request'});
  }
};

//Borrar CH
export async function deleteCentroHospitalizacion(req: Request, res: Response) {
  let {chCode} = req.params;
  try {
    await db().query(`DELETE
                      FROM centro_hospitalizacion
                      WHERE codecentroh = $1`, [chCode]);
    await deleteCentroSalud(chCode);
    return res.json({message: 'ok'});
  } catch (e) {
    console.error(e);
    return res.status(400).json({message: 'Bad Request'});
  }
};