import { Router, Request, Response, NextFunction } from 'express';
import { getJournals } from './journal.service';

const router = Router();

router.get('/journals/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("GET /journal/:id");
    } catch (error) {
      next(error);
    }
  });

router.get('/journals', async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("GET /journals");
    } catch (error) {
      next(error);
    }
  });

router.post("/journals", async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("POST /journals");
    } catch (error) {
        next(error);
    }
});

router.delete('/journals/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("DELETE /journal/:id");
    } catch (error) {
      next(error);
    }
  });

export default router;