

import { error, success } from '../helpers/handleResponse.js';

import "../helpers/reservations/reservations.helpers.js";
import * as reservationHelpers from "../helpers/reservations/reservations.helpers.js";


export const createReservation = async (req, res) => {
  
  
  const { id: UserId,body } = req.body;

  
  try {
      const reservation = await  reservationHelpers.createReservation(UserId, body);
  
      success( res, reservation, 200);
    } catch(err) {
       
        error(res, err, 500);
    };
};

export const checkInOut = async (req, res) => {
  
  const {id: UserId} = req.user;
  const { id, action } = req.params;

  try {
    await reservationHelpers.checkInOut(UserId, id, action);
    success(res, `The action ${action} was executed successfully`, 200);
    
  } catch (err) {
    error(res, err, 500);
  }
}

export const cancelReservation = async ( req, res ) => {

  const { id: UserId } = req.user;
  const { id } = req.params;
  
  console.log(req.user)

  
  try {
    await reservationHelpers.cancelReservation(UserId, id,res);
    success(res, "Reservation was canceled successfully.", 200);

  } catch (err) {
   error(res, err, 500);
  }
};

export const getCurrentOccupancy = async ( req, res ) => {

  try {
    const occupancyDetails = await reservationHelpers.getCurrentOccupancy();
    
    success(res, occupancyDetails, 200);
  } catch (err) {
    error(res, err, 500);
  }

}