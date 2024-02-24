import { Log } from "../../models/mongoose/Log.model.js";;
//import { success, error } from "../handleResponse.js";

export const getAllLogsAndCount = async (limit, offset) => {
  return await Promise.all([
    Log.countDocuments(),
    Log.find().limit(limit).skip(offset),
  ]);
};



