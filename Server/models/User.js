import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : [true, "Name is required..!"], 
    }, 
    email : {
        type : String, 
        unique : true, 
        required : [true, 'Email is Required..!']
    }, 
    password : {
        type : String, 
        required : true 
    }, 
    role : {
        type : String, 
        enum : ["Owner", "User"], 
        default : 'User'
    }, 
    image : {
        type : String, 
        default : ''
    },
}, 
{
    timestamp: true
});

const User = mongoose.model('User', userSchema);

export default User;