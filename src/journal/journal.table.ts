import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface JournalTable {
  id: Generated<number>;

  title: string;
  contents: string;
}

export type GetJournal = Selectable<JournalTable>;
export type NewJournal = Insertable<JournalTable>;
export type UpdateJournal = Updateable<JournalTable>;
