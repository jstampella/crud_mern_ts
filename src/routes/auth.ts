import { Router } from 'express';
import { MyRouter } from '../interfaces/route.interfaces';
import { loginCtrl, logoutCtrl, registerCtrl, verifyTokenCtrl } from '../controllers/auth.controller';
import { validatorLogin, validatorRegister } from '../validators/auth.validators';

const router = Router();

router.post('/register', validatorRegister, registerCtrl);
router.post('/login', validatorLogin, loginCtrl);
router.get('/verify', verifyTokenCtrl);
router.post('/logout', verifyTokenCtrl, logoutCtrl);

const myRouter: MyRouter = {
  router,
};

export default myRouter;
