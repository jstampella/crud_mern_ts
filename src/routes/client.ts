import { Router } from 'express';
import { MyRouter } from '../interfaces/route.interfaces';
import { auth } from '../middlewares/auth.middleware';
import {
  validatorCreateClient,
  validatorDeleteClient,
  validatorPaginationClient,
  validatorSearchClient,
  validatorUpdateClient,
} from '../validators/client.validators';
import {
  createClientCtrl,
  deleteClientCtrl,
  getClientCtrl,
  getClientsAllCtrl,
  getClientsCtrl,
  updateClientCtrl,
} from '../controllers/client.controller';

const router = Router();

router.get('/', auth, getClientsCtrl);

router.get('/all', [auth, ...validatorPaginationClient, ...validatorSearchClient], getClientsAllCtrl);

router.post('/', [auth, ...validatorCreateClient], createClientCtrl);

router.get('/:id', [auth, ...validatorDeleteClient], getClientCtrl);

router.put('/:id', [auth, ...validatorDeleteClient, ...validatorUpdateClient], updateClientCtrl);

router.delete('/:id', [auth, ...validatorDeleteClient], deleteClientCtrl);

const myRouter: MyRouter = {
  router,
};

export default myRouter;
