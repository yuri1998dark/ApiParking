import { Op } from 'sequelize';
import { logActivity } from '../LogActivity.js';
import  Reservation  from '../../models/sequelize/Reservation.model.js';
import  Place  from '../../models/sequelize/Place.model.js';
//import { reservationRepository } from '../repositories/index.js';


export const createReservation = async ( UserId, body ) => {

    const { startDateTime, endDateTime, carDetails } = body;
    console.log(startDateTime);
    console.log(endDateTime);
    console.log(carDetails);
    console.log(UserId);

    // Check if the startDateTime is in the past.
    if(new Date(startDateTime) < new Date()){
      const error = new Error();
      error.message = 'Cannot create a reservation in past';
      error.status = 400;
      throw error;
    }
    console.log("Breaking point 1")
    // Check if endDateTime is before startDateTime.
    if(new Date(endDateTime) < new Date(startDateTime)){
      const error = new Error();
      error.message = 'endDateTime always have to be after startDateTime';
      error.status = 400;
      throw error
    }
    console.log("Breaking point 2")
    // Get the total number of Places available.
    const totalPlaces = await Place.count();
    let placeid = null;
    console.log("Breaking point 3")
    // Loop through available Places to find one without overlapping reservations.
    for(let i = 1; i <= totalPlaces; i++){
        const place = await Place.findOne({
          where: {placeNumber: i}
        })

        placeid = place.id;
        console.log("Breaking point 4")
        // Check if there is an overlapping reservation for this Place.
        const overlappingReservation = await Reservation.findOne({
          where: {
            placeid,
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
      
        // If there's an overlap, reset PlaceId and continue to the next Place.
        if (overlappingReservation) {
          placeid = null;
          continue;
        }

        // Break the loop if a Place without overlapping reservations is found.
        break;
    };

    if(!placeid){
        const error = new Error();
        error.message = 'No hay plazas de aparcamiento disponibles en ese horario.';
        error.status = 400;
        throw error
    };
    
    const reservation = await Reservation.create({
        UserId,
        placeid,
        startDateTime,
        endDateTime,
        carDetails
    });

    logActivity(UserId, 'PARKING_RESERVATION');
    return reservation;

    
}

/* export const checkInOut = async ( UserId, id, action) => {
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
  const reservation = await reservationRepository.getReservationById(id);

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
} */