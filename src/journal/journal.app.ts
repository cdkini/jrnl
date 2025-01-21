import { NewJournal } from "./journal.table";
import { Journal } from "./journal.model";
import { JournalRepository } from "./journal.repository";
import { App } from "../types";

export class JournalApp implements App {
  repository: JournalRepository;

  constructor(repository: JournalRepository) {
    this.repository = repository;
  }

  async getJournal(id: number) {
    const dbJournal = await this.repository.get(id);
    if (!dbJournal) {
      throw new Error("Journal not found");
    }
    return dbJournal;
  }

  async createJournal(data: NewJournal) {
    return this.repository.create(data);
  }
}
