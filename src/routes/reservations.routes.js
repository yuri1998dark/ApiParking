import { Router } from "express";

import {
  authRequired,
  //validateFields,
  checkRole,
  validateOwner,
} from "../middlewares/exportAllMiddlewares.js";
import {
  createReservation,
  cancelReservation,
  getCurrentOccupancy,
  checkInOut,
} from "../controllers/exportAllControllers.js";

const router = Router();

router.get(
  "/",
  [authRequired, checkRole("ADMIN", "EMPLOYEE")], //validateFields],
  getCurrentOccupancy
);

router.post(
  "/",
  [
    authRequired,
    //check("startDateTime", "reservation startDateTime is required!")
     // .not()
     // .isEmpty(),
   // check("endDateTime", "reservation endDateTime is required!")
     // .not()
     // .isEmpty()
    //validateFields,
  ],
  createReservation
);

router.patch(
  "/:id",
  [authRequired, validateOwner], //validateFields,
  cancelReservation
);

router.patch(
  "/:action/:id",
  [authRequired, checkRole("ADMIN", "CLIENT") ],//validateFields],
  checkInOut
);

export default router;
