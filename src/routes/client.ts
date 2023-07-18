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

// Definir las rutas y los controladores correspondientes

/*
 * @route GET /
 * @desc Obtener los clientes del usuario
 * @access Privado
 */
router.get('/', auth, getClientsCtrl);

/*
 * @route GET /all
 * @desc Obtener todos los cliente por paginacion o total
 * @access Privado
 */
router.get('/all', [auth, ...validatorPaginationClient, ...validatorSearchClient], getClientsAllCtrl);

/*
 * @route POST /
 * @desc Crear un cliente
 * @access Privado
 */
router.post('/', [auth, ...validatorCreateClient], createClientCtrl);

/*
 * @route GET /:id
 * @desc Obtener un cliente por id
 * @access Privado
 */
router.get('/:id', [auth, ...validatorDeleteClient], getClientCtrl);

/*
 * @route PUT /:id
 * @desc Actualizar un cliente
 * @access Privado
 */
router.put('/:id', [auth, ...validatorDeleteClient, ...validatorUpdateClient], updateClientCtrl);

/*
 * @route DELETE /:id
 * @desc Eliminar un cliente
 * @access Privado
 */
router.delete('/:id', [auth, ...validatorDeleteClient], deleteClientCtrl);

const myRouter: MyRouter = {
  router,
};

export default myRouter;
