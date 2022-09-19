const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');

const { default: mongoose } = require('mongoose');
const tasksRoute = require('./routes/tasks')
const productRoute = require('./routes/products')
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
app.use('/api/products',productRoute)
app.listen(8800, () => {
     console.log("Backend server is running!");
   });

