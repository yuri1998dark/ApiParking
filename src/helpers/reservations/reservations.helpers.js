import { Op, where } from "sequelize";
import { logActivity } from "../LogActivity.js";
import Reservation from "../../models/sequelize/Reservation.model.js";
import Place from "../../models/sequelize/Place.model.js";
import { error,success } from "../handleResponse.js";
//import { reservationRepository } from '../repositories/index.js';

export const createReservation = async (UserId, body) => {
  const { startDateTime, endDateTime, carDetails } = body;
  console.log(UserId);
  // Check if the startDateTime is in the past.
  if (new Date(startDateTime) < new Date()) {
    const error = new Error();
    error.message = "No se puede crear una reserva en el pasado";
    error.status = 400;
    throw error;
  }

  // Check if endDateTime is before startDateTime.
  if (new Date(endDateTime) < new Date(startDateTime)) {
    const error = new Error();
    error.message = "endDateTime siempre debe ser después de startDateTime";
    error.status = 400;
    throw error;
  }


  const reservations = await Reservation.findAll({
    attributes: ["placeid"],
    where: {
      [Op.or]: [
        {
          startDateTime: {
            [Op.lt]: endDateTime,
          },
          endDateTime: {
            [Op.gt]: startDateTime,
          },
        },
      ],
    },
  });
  
  const reservationIds = reservations.map(reservation => reservation.placeid);
  
  const place = await Place.findOne({
    where: {
      id: {
        [Op.notIn]: reservationIds,
      },
    },
  });

  
  console.log("---------------------------");
  if (!place) {
    const error = new Error();
    error.message = "No hay plazas de aparcamiento disponibles en ese horario.";
    error.status = 400;
    throw error;
  }
  console.log("---------------------------");

  const reservation = await Reservation.create({
    reservationid: UserId,
    placeid: place.id,
    startDateTime,
    endDateTime,
    carDetails,
  });

  logActivity(UserId, "PARKING_RESERVATION");
  return reservation;
  // } catch (error) {
  console.log(error);

  //}

  //console.log(place)
};

 export const checkInOut = async ( UserId, id, action,res) => {
  // This is an object that maps the actions to the corresponding status and log
  const actionMap = {
    entry: {
      status: 'IN_PROGRESS',
      log: 'VEHICLE_ENTRY',
    },
    exit: {
      status: 'COMPLETED',
      log: 'VEHICLE_EXIT',
    }
  };
  
  // Check if the specified action is in the map
  if (!actionMap[action]) {
    return error(res, 'Action isn\'t valid', 400);
  }
  const reservation = await Reservation.findByPk(id);

  if(!reservation){
    return error(res, `Reservation was not found with id=${id}`, 404);
  }

  // Obtains the status and log corresponding to the action
  const { status, log } = actionMap[action];

  reservation.status = status;

  await reservation.save();
  logActivity(UserId, log);
}

export const cancelReservation = async( UserId, id) => {
  const reservation = await Reservation.findByPk(id);

  if(!reservation){
    error(res, `Reservation was not found with id=${id}`, 404);
  }

  if( reservation.status == 'IN_PROGRESS'){
    return error(res, `The reservation has already started, it cannot be canceled`, 400);
  }

  reservation.status = 'CANCELED'

  await reservation.save()
  logActivity(UserId, 'CANCELED_RESERVATION');
}

 export const getCurrentOccupancy = async () => {

  const totalPlaces = await Place.count();

  const parkingPlaces = await Reservation.findAll({
    where: {
      status: 'ACTIVE',
      [Op.and]: [
        {
          startDateTime: {
            [Op.lt]: new Date(),
          },
          endDateTime: {
            [Op.gt]: new Date(),
          },
        },
      ],
    },
  })

  const occupancyDetails = { 
    totalPlaces,
    occupiedPlace: parkingPlaces.length,
    availablePlaces: totalPlaces - parkingPlaces.length,
    occupationPercentage: (parkingPlaces.length / totalPlaces)  * 100 + "%"
  }

  return occupancyDetails;
} 
