import { Router } from 'express';
import { MyRouter } from '../interfaces/route.interfaces';
const router = Router();

router.post('/register', () => console.log('registro'));
router.post('/login', () => console.log('login'));
router.get('/verify', () => console.log('verify'));
router.post('/logout', () => console.log('logout'));

const myRouter: MyRouter = {
  router,
};

export default myRouter;
