import { Router } from 'express';
import userController from './user/user.controller'
import journalController from './journal/journal.controller';

const api = Router()
  .use(userController)
  .use(journalController)

export default Router().use('/api', api);
