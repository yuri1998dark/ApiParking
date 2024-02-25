import { error, success } from "../helpers/handleResponse.js";
//import { getAllUsersAndCount,updateUser, deleteUser} from "../helpers/users/user.helpers.js";
import * as usersHelpers from "../helpers/users/user.helpers.js";


export const getUsers = async (req, res) => {
    
    const { limit = 5, offset = 0 } = req.query;

    try {
        const users = await usersHelpers.getAllUsersAndCount(limit, offset);
        success(res, users, 200);
    } catch (err) {
        error(res, err, 500);
    }
};



export const updatedUser = async ( req, res ) => {

    const { id } = req.params;
    console.log("-----Hola------")
    const { id: _id, password, ...data } = req.body;

    try {
        const updated1User = await usersHelpers.updateUser(id, data);
        success(res, updated1User, 200);
    
    } catch (err) {
        error( res, `Error updating User with id=${id},user not found`, 500 );   
    }

}

export const deletedUser = async ( req, res ) => {
    
    const { id } = req.params;

    try {
        const num = await deleteUser(id);
        if( num == 1){
            success(res, "User was deleted successfully.", 200);
        } else {
            error(res, `Cannot delete User with id=${id}. Maybe User was not found`, 404 );
        }
    } catch (err) {
        error( res, `Error updating User with id=${id},user not found`, 500 );   
    }
}
