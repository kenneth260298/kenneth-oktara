const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();
//Create server
const app = express();

//PORT
const PORT = process.env.PORT;

//DB
dbConnection();

//CORS  
app.use(cors());

//Read and parse body
app.use(express.json());

//Routes
app.use('/api/packages', require('./routes/packages.routes'));

//Public Directory
app.use(express.static('public/client'));

//Listen request
app.listen(PORT, () => {
    console.log(`Server Running -> ${PORT}`)
});