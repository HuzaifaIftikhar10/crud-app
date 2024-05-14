// Importing necessary modules
import mongoose from 'mongoose'; // Importing Mongoose for MongoDB interaction
import bcrypt from 'bcrypt'; // Importing bcrypt for password hashing

// Defining the user schema using Mongoose
const userSchema = new mongoose.Schema({
    fname: {
        type: 'string', // Data type for first name
        required: true // Field is required
    },
    lname: {
        type: 'string', // Data type for last name
        required: true // Field is required
    },
    email: {
        type: 'string', // Data type for email
        required: true // Field is required
    },
    password: {
        type: 'string', // Data type for password
        required: true // Field is required
    }
});

// Pre-save hook to hash the password before saving to the database
userSchema.pre('save', async function(next) {
    const user = this; // 'this' refers to the current user being saved
    
    // Checking if the password has been modified, if not, proceed to the next middleware
    if (!user.isModified('password')) return next();
    
    try {
        // Generating a salt with a complexity of 10
        const salt = await bcrypt.genSalt(10);
        
        // Hashing the password with the generated salt
        const hashedPassword = await bcrypt.hash(user.password, salt);
        
        // Setting the user's password to the hashed password
        user.password = hashedPassword;
        
        // Proceeding to the next middleware
        next();
    } catch (error) {
        // If an error occurs, call the next middleware with the error
        return next(error);
    }
});

// Exporting the User model, which will be accessible throughout the application
export default mongoose.model('User', userSchema);
