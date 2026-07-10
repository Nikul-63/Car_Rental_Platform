import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        /* mongoose.connection.on('connected', () => console.log("Database Connected"));
        await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`); */

        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`);
        console.log(`Database Connected : ${conn.connection.name}`);
    }catch(error)
    {
        console.log("Database connection failed : ",error.message);
    }
}

export default connectDB;