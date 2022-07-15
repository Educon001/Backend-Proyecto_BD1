import {Medicamento} from '../Entities';
import {db} from '../Config/db';
import {QueryResult} from 'pg';
import {Request, Response} from 'express';

//get all Medicamento
export async function getMedicamento(req: Request, res: Response) {
    try {
        let results = await db().query(`SELECT *
                                    FROM Medicamento`) as QueryResult<Medicamento>;
        return res.json(results.rows);
    } catch (e) {
        console.error(e);
        return res.status(400).json({message: 'Bad Request'});
    }
};

//Crear Medicamento
export async function createMedicamento(req: Request, res: Response) {
    console.info('Attempting to create medicamento with input', req.body);
    let medicamento = new Medicamento(req.body.name, req.body.component, parseInt(req.body.concentration));
    try {
        console.time(`Inserted medicamento with name ${medicamento.name}`);
        await db().
        query('INSERT INTO medicamento VALUES (default, $1, $2, $3)',
            [
                medicamento.name, medicamento.component, medicamento.concentration]);
        console.timeEnd(`Inserted medicamento with name ${medicamento.name}`);
        return res.json(medicamento);
    } catch (e) {
        console.error(e);
        return res.status(400).json({message: 'Bad Request'});
    }
};

//Actualizar medicamento
export async function updateMedicamento(req: Request, res: Response) {

    let {medicamentoCode} = req.params;
    let medicamento = new Medicamento(req.body.name, req.body.component, parseInt(medicamentoCode));
    try {
        await db().query(`UPDATE medicamento
                      SET name=$2,
                          component=$3,
                          concentration=$4
                      WHERE code = $1
        `,
            [
                medicamento.code,
                medicamento.concentration,
                medicamento.name,
                medicamento.concentration

            ]);
        return res.json(medicamento);
    } catch (e) {
        console.error(e);
        return res.status(400).json({message: 'Bad Request'});
    }
};

//Borrar medicamento
export async function deleteMedicamento(req: Request, res: Response) {
    let {medicamentoCode} = req.params;
    try {
        await db().query(`DELETE
                      FROM medicamento
                      WHERE code = $1 `, [parseInt(medicamentoCode)])
        ;
        return res.json({message: 'ok'});
    } catch (e) {
        console.error(e);
        return res.status(400).json({message: 'Bad Request'});
    }
};