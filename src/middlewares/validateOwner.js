import User from "../models/sequelize/User.model.js";
import Reservation from "../models/sequelize/Reservation.model.js";

export const validateOwner = async (req, res, next) => {

    const { id:UserId } = req.user;
    const { id } = req.params;
    console.log(UserId)
    const user = await User.findByPk(UserId);
    const reservation = await Reservation.findByPk(id);

    if(user.role === 'CLIENT' && reservation.UserId !== UserId){
        return error(res, 'This reservation doesn\'t belog to this user', 401);
    }

    next();
}