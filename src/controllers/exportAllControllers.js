export {
  register,
  login,
  logout,
  verifyToken,
  profile,
} from "./auth.controllers.js";

export { 
    createReservation,
    checkInOut,
    cancelReservation,
    getCurrentOccupancy,


} from "./reservations.controllers.js"