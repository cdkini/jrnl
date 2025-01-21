import { Kysely } from "kysely";
import { GetJournal, NewJournal } from "./journal.table";
import { Database } from "../database";
import { Repository } from "../types";


export class JournalRepository implements Repository {

    db: Kysely<Database>

    constructor(db: Kysely<any>) {
        this.db = db
    }

    async get(id: number): Promise<GetJournal> {
        const dbJournal = await this.db.selectFrom('journal')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst()

        if (!dbJournal) {
            throw new Error("Journal not found")
        }

        return dbJournal
    }

    async create(data: NewJournal): Promise<NewJournal> {
        return await this.db.insertInto('journal')
        .values(data)
        .returningAll()
        .executeTakeFirstOrThrow()
    }
}
