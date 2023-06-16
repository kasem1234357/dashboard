const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const { default: mongoose } = require('mongoose');
const tasksRoute = require('./routes/tasks')
const productRoute = require('./routes/products')
const faqRoute = require('./routes/faq')
const contactRoute = require("./routes/contact")
const inviteRoute = require("./routes/invite")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user");
const app = express()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
dotenv.config();
const connectDB =  () => {
   mongoose
      .connect(process.env.MONGO_URL, {
         useNewUrlParser: true
      }, ()=>{
       
        console.log("done");

        
      })
}
connectDB()
app.use(cors())
app.use(express.json())

/* -------------- PASSPORT AUTHENTICATION ----------------*/


app.use('/api/tasks',tasksRoute)
app.use('/api/products',productRoute)
app.use('/api/faq',faqRoute)
app.use("/api/contact",contactRoute)
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/invite",inviteRoute)
app.listen(8800, () => {
     console.log("Backend server is running!");
   });

