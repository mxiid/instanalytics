import mongoose from 'mongoose';

const { Schema } = mongoose;

const UsersSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
});

export default mongoose.models.Users || mongoose.model('Users', UsersSchema);