// Importar dependencias
import { Router } from 'express';
import { MyRouter } from '../interfaces/route.interfaces';
import { loginCtrl, logoutCtrl, registerCtrl, verifyTokenCtrl } from '../controllers/auth.controller';
import { validatorLogin, validatorRegister } from '../validators/auth.validators';

// Crear instancia del enrutador
const router = Router();

// Definir las rutas y los controladores correspondientes

/*
 * @route POST /register
 * @desc Registrar un nuevo usuario
 * @access Público
 */
router.post('/register', validatorRegister, registerCtrl);

/*
 * @route POST /login
 * @desc Iniciar sesión con las credenciales proporcionadas
 * @access Público
 */
router.post('/login', validatorLogin, loginCtrl);

/*
 * @route GET /verify
 * @desc Verificar el token de autenticación del usuario
 * @access Privado
 */
router.get('/verify', verifyTokenCtrl);

/*
 * @route POST /logout
 * @desc Cerrar la sesión del usuario actual
 * @access Privado
 */
router.post('/logout', verifyTokenCtrl, logoutCtrl);

// Crear instancia de MyRouter, que contiene el enrutador creado anteriormente
const myRouter: MyRouter = {
  router,
};

// Exportar la instancia de MyRouter como el módulo predeterminado
export default myRouter;
