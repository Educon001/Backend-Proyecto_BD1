import {Persona} from '../Entities';
import {db} from '../Config/db';
import {QueryResult} from "pg";


export class PersonaC {
    //get all Personas.
    async getPersonas(): Promise<Persona[] | void> {
        try {
            let results = await db().query(`SELECT * FROM Persona`) as QueryResult<any>;
            return results.rows;
        } catch (e) {
            console.error(e);
        }

    }


}

module.exports = PersonaC;