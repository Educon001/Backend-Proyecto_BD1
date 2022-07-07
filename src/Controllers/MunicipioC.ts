import {Municipio} from '../Entities';
import {db} from '../Config/db';
import {QueryResult} from 'pg';
import {Request, Response} from 'express';

//get all municipio
export async function getMunicipios(req: Request, res: Response) {
  try {
    let results = await db().query(`SELECT *
                                    FROM Municipio`) as QueryResult<Municipio>;
    return res.json(results.rows);
  } catch (e) {
    console.error(e);
    return res.status(400).json({message: 'Bad Request'});
  }
};

//Crear municipio
export async function createMunicipio(req: Request, res: Response) {
  console.info('Attempting to create municipio with input', req.body);
  let municipio = new Municipio(req.body.name, req.body.codeestado);
  try {
    console.time(`Inserted municipality with name ${municipio.name}`);
    await db().
        query('INSERT INTO municipio VALUES (default, $1, $2)',
            [municipio.name, municipio.codeEstado]);
    console.timeEnd(`Inserted municipality with name ${municipio.name}`);
    return res.json(municipio);
  } catch (e) {
    console.error(e);
    return res.status(400).json({message: 'Bad Request'});
  }
};

//Actualizar estado
export async function updateMunicipio(req: Request, res: Response) {
  let {municipioCode} = req.params;
  let municipio = new Municipio(req.body.name, req.body.codeestado,
      parseInt(municipioCode));
  try {
    await db().query(`UPDATE municipio
                      SET name=$2,
                          codeEstado=$3
                      WHERE code = $1`,
        [municipio.code, municipio.name, municipio.codeEstado]);
    return res.json(municipio);
  } catch (e) {
    console.error(e);
    return res.status(400).json({message: 'Bad Request'});
  }
};

//Borrar municipio
export async function deleteMunicipio(req: Request, res: Response) {
  let {municipioCode} = req.params;
  try {
    await db().query(`DELETE
                      FROM municipio
                      WHERE code = $1`, [municipioCode]);
    return res.json({message: 'ok'});
  } catch (e) {
    console.error(e);
    return res.status(400).json({message: 'Bad Request'});
  }
};