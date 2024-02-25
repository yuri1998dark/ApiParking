import { Router } from 'express';
//import { check } from 'express-validator';
import { getUsers, updatedUser, deletedUser } from '../controllers/users.controllers.js';
import { authRequired,  checkRole } from '../middlewares/exportAllMiddlewares.js'
//import { emailExist, userDoesntExist } from '../helpers/db-validators.js'

const router = Router();

router.get('/', [
    authRequired,
    checkRole('ADMIN', 'EMPLOYEE'),
   
], getUsers);


router.put('/:id', [
    authRequired,
    checkRole('ADMIN'),
], updatedUser);

router.delete('/:id', [
    authRequired,
    checkRole('ADMIN'),
   
], deletedUser);

export default router;