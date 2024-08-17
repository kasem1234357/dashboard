const { default: mongoose } = require("mongoose");
const connectDB = (local =false) => {
    // mongoose.set('strictQuery', false);

    mongoose.connect(
      local?process.env.MONGO_URL_LC :process.env.MONGO_URL,
      { useNewUrlParser: true },
      (error) => {
        if (error) {
          console.error('Failed to connect to MongoDB:', error);
        } else {
          console.log('Connected to MongoDB');
        }
      }
    );
  };
  
module.exports ={ connectDB}
  