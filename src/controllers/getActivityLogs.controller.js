import { Log } from '../models/mongoose/Log.model.js';
import { success,error } from '../helpers/handleResponse.js';

export const getAllLogsAndCount = async(limit, offset,res) => {
   try {
    
       const[total, log] = await Promise.all([
             Log.countDocuments(),
             Log.find()
                     .limit(limit)
                     .skip(offset)
         ])
    success(res,{total,log},200);

   } catch (error) {
     error(res,err,500)
   }

    
}