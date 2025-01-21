import { Router, Request, Response, NextFunction } from 'express';
import { JournalApp } from './journal.app';
import { Controller } from '../types';


export class JournalController implements Controller {
    router: Router;
    #journalApp: JournalApp;

    constructor(router: Router, journalApp: JournalApp) {
        this.router = router;
        this.#journalApp = journalApp; 
    }

    register() {
        this.router.get('/journals/:id', async (req: Request, res: Response, next: NextFunction) => {
            try {
                this.#journalApp.getJournal(parseInt(req.params.id));
            } catch (error) {
                next(error);
            }
        });

        this.router.post("/journals", async (req: Request, res: Response, next: NextFunction) => {
            try {
                console.log("POST /journals");
            } catch (error) {
                next(error);
            }
        });
    }
}