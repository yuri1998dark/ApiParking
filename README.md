# ApiParking
The ApiParking project is a parking management system that allows you to make reservations, see their availability, and also has an authentication system based on employee, administrator and customer roles, making the main use cases of a RESTfull API and CRUD system

## Getting Started

### Prerequisites

- Node.js >= v19.5
- Npm (Node Package Manager)
- PostgresSQL (for main database)
- MongoDB (for activity logs)


### Installation

1. Clone the project repository:

   ```
   https://github.com/yuri1998dark/ApiParking.git
   ```

2. Navigate to the project directory:

   ```
   cd ApiParking
   ```
3. Navigate to the project directory:
    
   ```
   npm install
   ```
4. Modify .env file PORT and SECRETKEY 
  --PORT server listen
  --SECRETKEY private or secretkey for encrypted 
  
5. Configure the database connections
  --- /src/config/mongo.config.js ---> for Mongo Database 
      /src/config/sequelize.config.js ---> for Postgres Database 
      
## Usage

### Starting the Server

Run the following command to start the server:
   
   ```
   npm run start
   ```     
   
### API Endpoints
1. Reserve a Parking Place: 
- Endpoint: POST /parking/reservations
- Description: Reserve a parking place for a specific vehicle at a given date and time.
- Request Body: JSON with vehicle details and reservation date and time.
- Response: Details of the reservation.

2. Check Parking Occupancy: 
- Endpoint: GET /parking/reservations
- Description: Get the current occupancy status of the parking lot.
- Response: List of parking spots with occupancy details.

3. Update User Details
- Endpoint: PUT /parking/users/{id}
- Description: Update user details such as name, email, or phone number.
- Request Body: JSON with updated user details.
- Response: Status 200

4. Access Parking Logs
- Endpoint: GET /parking/logs
- Description: Access activity logs of the parking system, including reservations, cancellations, vehicle entries, and exits.
- Response: List of activity logs.
 

 ###For testing

    
   ```
   npm run test
   ```     
