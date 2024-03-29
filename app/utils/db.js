import mongoose from 'mongoose';

const connect = async () => {
    if (mongoose.connections[0].readystate) return;

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
}

export default connect;