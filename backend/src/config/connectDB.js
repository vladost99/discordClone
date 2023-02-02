const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected`);
    }
    catch(err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;