import { Express } from "express";
import express from "express";
import { Request, Response, Router } from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import { Kysely, SqliteDialect } from "kysely";
import { Database } from "./database";
import SQLite from "better-sqlite3";
import { JournalRepository } from "./journal/journal.repository";
import { JournalApp } from "./journal/journal.app";
import { JournalController } from "./journal/journal.controller";

export interface Config {
  port: number;
}

export class API {
  #app: Express;
  #db: Kysely<Database>;
  #router: Router;
  #config: Config;

  constructor(config: Config) {
    this.#app = express();
    this.#db = new Kysely<Database>({
      dialect: new SqliteDialect({
        database: new SQLite(":memory:"),
      }),
    });
    this.#router = Router();
    this.#config = config;

    this.configure();
  }

  private configure() {
    this.#app.get("/", (req: Request, res: Response) => {
      res.json({ status: "API is running on /api" });
    });

    this.configureMiddleware();
    this.configureEndpoints();
  }

  private configureMiddleware() {
    this.#app.use(cors());
    this.#app.use(bodyParser.json());
    this.#app.use(bodyParser.urlencoded({ extended: true }));
  }

  private configureEndpoints() {
    // Data layer
    const journalRepository = new JournalRepository(this.#db);

    // Application layer
    const journalApp = new JournalApp(journalRepository);

    // Service layer
    const journalController = new JournalController(this.#router, journalApp);

    // Register endpoints
    journalController.register();
    const v1Router = Router().use("/api/v1", this.#router);
    this.#app.use(v1Router);
  }

  listenAndServe() {
    const port = this.#config.port;
    this.#app.listen(port, () => {
      console.info(`server up on port ${port}`);
    });
  }
}
