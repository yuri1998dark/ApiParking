import { success, error } from "../helpers/handleResponse.js";
import {
  getAllLogsAndCount
} from "../helpers/logs/logs.helpers.js";

export const getActivityLogs = async ( req ,res) => {
  try {
    const [total, logs] = await getAllLogsAndCount(20, 0);
   
    success(res, { total, logs },200);
  } catch (err) {
    error(res,err,500)
  }
};
