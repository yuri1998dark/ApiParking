import { Router } from "express";

import {
  authRequired,
  checkRole,
  validateOwner,
} from "../middlewares/exportAllMiddlewares.js";
import {
  createReservation,
  cancelReservation,
  getCurrentOccupancy,
  checkInOut,
} from "../controllers/exportAllControllers.js";
import { reservationsSchema } from "../schemas/reservations.schema.js";
import { validateSchema,validateParamsSchema } from "../middlewares/validatorSchema.js";
import { paramsSchema } from "../schemas/paramsId.schema.js";


const router = Router();

router.get(
  "/",
  authRequired,
  checkRole("ADMIN", "EMPLOYEE"),
  getCurrentOccupancy
);

router.post("/", authRequired,validateSchema(reservationsSchema), createReservation);

router.patch("/:id", [authRequired, validateOwner],validateParamsSchema(paramsSchema) ,cancelReservation);

router.patch(
  "/:action/:id",
  [authRequired, checkRole("ADMIN", "CLIENT")],
  checkInOut
);

export default router;
