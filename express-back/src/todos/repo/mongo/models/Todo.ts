import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Todo = new Schema({
    content: {
        type: String,
    },
    isCompleted: {
        type: Boolean,
    },
    isEditing: {
        type: Boolean,
    },
    // lastUpdatedBy: {
    //     type: String,
    // },
});

Todo.set('toJSON', {
    virtuals: true,
});

export default mongoose.model('Todo', Todo);
