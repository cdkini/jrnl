import { Kysely } from "kysely";
import { Router } from "express";
import { Express } from "express";

export interface Repository {
    db: Kysely<any>
}

export interface App {
    repository: Repository
}

export interface Controller {
    router: Router
    register(): void
}

