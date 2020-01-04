import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const Todo = new Schema({
    content: {
        type: String
    },
    isCompleted: {
        type: Boolean
    },
    isEditing: {
        type: Boolean
    }
});

Todo.set('toJSON', {
    virtuals: true
});

export default mongoose.model('Todo', Todo);
