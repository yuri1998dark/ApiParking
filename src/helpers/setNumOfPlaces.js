import Place  from "../models/sequelize/Place.model.js";

export const createPlaces = async () => {
  const numPlaces = process.env.NUM_OF_SPOTS || 20;

  const existsPlaces = await Place.findOne();
  const placesPromise = [];
  if (!existsPlaces) {
    try {
      
      for (let i = 1; i <= numPlaces; i++) {
        placesPromise.push(
          Place.create({
            placeNumber: i,
          })
        );
      }
      const places = await Promise.all(placesPromise);
      console.log(`${places.length} places are ready!!`);
 
     
      
    } catch (err) {
      console.log(err);
    }

  }
};
