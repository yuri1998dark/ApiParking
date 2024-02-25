import { Router } from 'express';
import { getActivityLogs} from '../controllers/getActivityLogs.controller.js';
//import { validateFields } from '../middlewares/validateFields.js';
import { authRequired } from '../middlewares/validateToken.js'; 
import { checkRole } from '../middlewares/checkRole.js';

const app = Router();

app.get('/', [
    authRequired,
    checkRole('ADMIN', 'EMPLOYEE')
    
], await getActivityLogs)


export default app;