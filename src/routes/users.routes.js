import { Router } from 'express';
//import { check } from 'express-validator';
import { getUsers, updatedUser, deletedUser } from '../controllers/users.controllers.js';
import { authRequired,  checkRole } from '../middlewares/exportAllMiddlewares.js'
//import { emailExist, userDoesntExist } from '../helpers/db-validators.js'

const router = Router();

router.get('/', [
    authRequired,
    checkRole('ADMIN', 'EMPLOYEE'),
   // validateFields
], getUsers);


router.put('/:id', [
    authRequired,
   // check('id').custom(userDoesntExist),
    checkRole('ADMIN'),
   // validateFields
], updatedUser);

router.delete('/:id', [
    authRequired,
    checkRole('ADMIN'),
   // validateFields
], deletedUser);

export default router;