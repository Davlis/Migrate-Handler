import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default mongoose.model('User', new Schema({
    name: {
        type     : String,
        required : true,
        default: '',
    },
}, {
    collection: 'users',
    versionKey: false
}))
