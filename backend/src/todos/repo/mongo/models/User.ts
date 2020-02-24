import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const User  = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

User.set('toJSON', {
   virtuals: true,
});

export default mongoose.model('User', User);
