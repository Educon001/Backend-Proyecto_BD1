import {Variante} from '../Entities';
import {db} from '../Config/db';
import {QueryResult} from 'pg';
import {Request, Response} from 'express';

//get all variante
export async function getVariante(req: Request, res: Response) {
    try {
        let results = await db().query(`SELECT *
                                    FROM virus_variante`) as QueryResult<Variante>;
        return res.json(results.rows);
    } catch (e) {
        console.error(e);
        return res.status(400).json({message: 'Bad Request'});
    }
};

//Crear Variante
export async function createVariante(req: Request, res: Response) {
    console.info('Attempting to create variante with input', req.body);
    let variante = new Variante(req.body.denom_oms, req.body.linaje, parseInt(req.body.origin_year), parseInt(req.body.origin_month), req.body.clasification, parseInt(req.body.code_pais));
    try {
        console.time(`Inserted variante with name ${variante.demomOMS}`);
        await db().
        query('INSERT INTO virus_variante VALUES ($1, $2, $3,$4, $5, $6)',
            [
                variante.demomOMS,
                variante.linaje,
                variante.originYear,
                variante.originMonth,
                variante.clasification,
                variante.codePais]);
        console.timeEnd(`Inserted variante with name ${variante.demomOMS}`);
        return res.json(variante);
    } catch (e) {
        console.error(e);
        return res.status(400).json({message: 'Bad Request'});
    }
};

//Actualizar tratamiento
export async function updateVariante(req: Request, res: Response) {

    let {varianteCode} = req.params;
    let variante = new Variante(req.body.denom_oms, req.body.linaje, parseInt(req.body.origin_year), parseInt(req.body.origin_month), req.body.clasification, parseInt(req.body.code_pais));
    try {
        await db().query(`UPDATE virus_variante
                      SET linaje=$2,
                          origin_year=$3,  
                          origin_month=$4,
                          clasification=$5,
                          code_pais=$6
                      WHERE denom_oms = $1
        `,
            [
                variante.demomOMS, variante.linaje, variante.originYear,
                variante.clasification, variante.codePais
            ]);
        return res.json(variante);
    } catch (e) {
        console.error(e);
        return res.status(400).json({message: 'Bad Request'});
    }
};

//Borrar variante
export async function deleteVariante(req: Request, res: Response) {
    let {varianteDenomOms} = req.params;
    try {
        await db().query(`DELETE
                      FROM virus_variante
                      WHERE denom_oms = $1 `, [parseInt(varianteDenomOms)])
        ;
        return res.json({message: 'ok'});
    } catch (e) {
        console.error(e);
        return res.status(400).json({message: 'Bad Request'});
    }
};