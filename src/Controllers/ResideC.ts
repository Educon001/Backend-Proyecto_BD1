import {Reside} from '../Entities';

import {db} from '../Config/db';
import {QueryResult} from 'pg';
import {Request, Response} from 'express';

//get all Paises.
export async function getResidente(req: Request, res: Response) {
    try {
        let results = await db().query(`SELECT *
                                    FROM reside`) as QueryResult<Reside>;
        return res.json(results.rows);
    } catch (e) {
        console.error(e);
        return res.status(400).json({message: 'Bad Request'});
    }
};

//Crear Reside

export async function createResidente(req: Request, res: Response) {
    console.info('Attempting to create residente with input', req.body);
    let reside = new Reside(parseInt(req.body.codeprovincia), req.body.idpersona, req.body.datereside);
    try {
        console.time(
            `Inserted residente with code ${reside.codeProvincia, reside.idPersona, new Date(reside.dateReside)}`);
        await db().
        query('INSERT INTO reside VALUES ($1, $2, $3)',
            [
                reside.codeProvincia,
                reside.idPersona,
                reside.dateReside]);
        console.timeEnd(
            `Inserted reside with code ${reside.codeProvincia, reside.idPersona, reside.dateReside}`);
        return res.json(reside);
    } catch (e) {
        console.error(e);
        return res.status(400).json({message: 'Bad Request'});
    }
};

//Actualizar residente
export async function updateResidente(req: Request, res: Response) {

    let {
        resideCodeProvincia,
        resideIdPersona,
        resideFechaReside
    } = req.params;
    let reside = new Reside(parseInt(resideCodeProvincia), resideIdPersona, new Date(resideFechaReside));
    try {
        await db().query(`UPDATE reside
                      SET codeprovincia=$2
                      WHERE idpersona=$1
                        and codeprovincia=$2
                        and datereside=$3
        `,

            [
                reside.codeProvincia,
                reside.idPersona,
                reside.dateReside]);
        return res.json(reside);
    } catch (e) {
        console.error(e);
        return res.status(400).json({message: 'Bad Request'});
    }
};

//Borrar residente
export async function deleteResidente(req: Request, res: Response) {
    let {
        resideCodeProvincia,
        resideIdPersona,
        resideFechaReside
    } = req.params;
    try {
        await db().query(`DELETE
                      FROM reside
                      WHERE codeprovincia=$1
                        and idpersona=$2
                        and datereside=$3
                      `, [
            resideCodeProvincia,
            resideIdPersona,
            resideFechaReside]);
        return res.json({message: 'ok'});
    } catch (e) {
        console.error(e);
        return res.status(400).json({message: 'Bad Request'});
    }
};