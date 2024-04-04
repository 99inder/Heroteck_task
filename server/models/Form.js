import { Schema, model } from 'mongoose';

const formSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [30, 'Name cannot exceed 30 characters'],
        validate: {
            validator: /^[a-zA-Z\s]*$/,
            message: 'Name should contain only alphabets and spaces'
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: [true, 'Email must be unique'],
        match: [/^[a-z0-9.]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Invalid email format. Please provide a valid email address.']
    },
    countryCode: {
        type: String,
        required: [true, 'Country code is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        match: [/^[0-9]{8,15}$/, 'Phone number must be between 8 to 15 digits']
    }
});

export default model('Form', formSchema);