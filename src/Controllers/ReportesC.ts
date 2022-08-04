import {db} from '../Config/db';
import {Request, Response} from 'express';
import {QueryResult} from 'pg';

export async function Reporte1(req: Request, res: Response) {
   try {
      let results = await db().query(`SELECT *
                                    FROM reporte1`) as QueryResult;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

export async function Reporte2(req: Request, res: Response) {
   try {
      let results = await db().query(`SELECT *
                                    FROM reporte2`) as QueryResult;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

export async function Reporte3(req: Request, res: Response) {
   try {
      let results = await db().query(`SELECT *
                                    FROM reporte3`) as QueryResult;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

export async function Reporte4(req: Request, res: Response) {
   try {
      let results = await db().query(`SELECT *
                                    FROM reporte4`) as QueryResult;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

export async function Reporte5(req: Request, res: Response) {
   try {
      let results = await db().query(`SELECT *
                                    FROM reporte5`) as QueryResult;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

export async function Reporte6(req: Request, res: Response) {
   try {
      let results = await db().query(`SELECT *
                                    FROM reporte6`) as QueryResult;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

export async function Reporte7(req: Request, res: Response) {
   try {
      let results = await db().query(`SELECT *
                                    FROM reporte7`) as QueryResult;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

export async function Reporte8(req: Request, res: Response) {
   try {
      let results = await db().query(`SELECT *
                                    FROM reporte8`) as QueryResult;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};

export async function Reporte9(req: Request, res: Response) {
   try {
      let results = await db().query(`SELECT *
                                    FROM reporte9`) as QueryResult;
      return res.json(results.rows);
   } catch (e) {
      console.error(e);
      return res.status(400).json({message: 'Bad Request'});
   }
};