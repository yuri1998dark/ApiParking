import {connect} from 'mongoose'

export const connectMongo = async() => {
    try {
        await connect(process.env.MONGODB_CNN || 'mongodb://127.0.0.1:27017/parkingLogs');
        console.log('parkingLogs have been connected')
        
    } catch (error) {
        console.log(error);
        throw Error('Error al conectarse a la base de datos');
    }
}
