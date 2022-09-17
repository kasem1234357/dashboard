const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');
const {connectToDb,getDb} = require('./db/db');
const { default: mongoose } = require('mongoose');
const tasksRoute = require('./routes/tasks')
const app = express()

dotenv.config();
mongoose.connect(
 process.env.MONGO_URL,
 { useNewUrlParser: true },
 () => {
   console.log("Connected to MongoDB");
 }
);
app.use(cors())
app.use(express.json())

app.use('/api/tasks',tasksRoute)
app.listen(8800, () => {
     console.log("Backend server is running!");
   });

