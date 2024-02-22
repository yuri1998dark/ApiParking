import { Log } from "../../models/mongoose/Log.model.js";;
//import { success, error } from "../handleResponse.js";

export const getAllLogsAndCount = async (limit, offset) => {
  return await Promise.all([
    Log.countDocuments(),
    Log.find().limit(limit).skip(offset),
  ]);
};



/* export const obtenerPrimerosElementos = async ( res) => {
    try {
        const elementos = await Log.coun.limit(20).skip(0);
        res.json(elementos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los elementos' });
    }
};
 */