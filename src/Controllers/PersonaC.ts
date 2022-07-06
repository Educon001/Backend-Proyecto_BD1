import {Persona} from '../Entities';
import {db} from '../Config/db';
import {QueryResult} from "pg";


export class PersonaC {
    //get all Personas.
    async getPersonas(): Promise<Persona[] | void> {
        try {
            let results = await db().query(`SELECT *
                                            FROM Persona`) as QueryResult<any>;
            return results.rows;
        } catch (e) {
            console.error(e);
        }
    };

    //Crear persona.
    async createPersona(p: Persona) {
        try {
            await db().query("INSERT INTO Persona VALUES ($1, $2, $3, $4, $5, $6)", [p.ID, p.name, p.lastName, p.sex, p.birthdate, p.highRisk])
            return;
        } catch (e) {
            console.error(e);
        }
    };

    //Actualizar persona
    async updatePersona(p: Persona) {
        try {
            await db().query(`UPDATE Persona
                              SET Name=$2,
                                  LastName=$3,
                                  Sex=$4,
                                  Birthdate=$5,
                                  HighRisk=$6
                              WHERE id = $1`, [p.ID, p.name, p.lastName, p.sex, p.birthdate, p.highRisk])
            return;
        } catch (e) {
            console.error(e);
        }
    };

    //Borrar persona
    async deletePersona(personaId: string) {
        try {
            await db().query(`DELETE
                              FROM Persona
                              WHERE id = $1`, [personaId]);
            return;
        } catch (e) {
            console.error(e);
        }
    };
};