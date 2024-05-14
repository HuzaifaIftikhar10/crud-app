// Importing the User model from the user model file
import User from "../model/userModel.js";

// Controller function to create a new user
export const create = async (req, res) => {
    try {
        // Creating a new User instance with the request body
        const userData = new User(req.body);
        
        // Checking if user data exists
        if (!userData) {
            return res.status(404).json({ message: "User Data not found" });
        }
        
        // Saving the user data to the database
        const savedData = await userData.save();
        
        // Sending success response
        res.status(200).json({msg: "User Created Successfully"});
    } catch (error) {
        // Sending error response
        res.status(500).json({ message: error.message });
    }
}

// Controller function to get all users
export const getAll = async(req, res) => {
    try {
        // Finding all users in the database
        const userData = await User.find();
        
        // Checking if user data exists
        if (!userData){
            return res.status(404).json({ message: "User Data not found" });
        }
        
        // Sending user data as response
        res.status(200).json(userData);
    } catch (error) {
        // Sending error response
        res.status(500).json({ message: error.message });
    }
}

// Controller function to get a single user by ID
export const getOne = async(req, res) => {
    try {
        // Extracting user ID from request parameters
        const id = req.params.id;
        
        // Finding user by ID in the database
        const userExist = await User.findById(id);
        
        // Checking if user exists
        if (!userExist){
            return res.status(404).json({ message: "User Data not found" });
        }
        
        // Sending user data as response
        res.status(200).json(userExist);
    } catch (error) {
        // Sending error response
        res.status(500).json({ message: error.message });
    }
}

// Controller function to update a user by ID
export const update = async(req, res) => {
    try {
        // Extracting user ID from request parameters
        const id = req.params.id;
        
        // Finding user by ID in the database
        const userExist = await User.findById(id);
        
        // Checking if user exists
        if(!userExist){
            return res.status(401).json({msg: "User not found"})
        }
        
        // Updating user data in the database
        const updatedData = await User.findByIdAndUpdate(id, req.body, {new: true});
        
        // Sending success response
        res.status(200).json({msg: "User Data updated successfully"});
    } catch (error) {
        // Sending error response
        res.status(500).json({ message: error.message });
    }
}

// Controller function to delete a user by ID
export const deleteUser = async(req, res) => {
    try {
        // Extracting user ID from request parameters
        const id = req.params.id;
        
        // Finding user by ID in the database
        const userExist = await User.findById(id);
        
        // Checking if user exists
        if(!userExist){
            return res.status(401).json({msg: "User not found"})
        }
        
        // Deleting user from the database
        await User.findByIdAndDelete(id);
        
        // Sending success response
        res.status(200).json({msg:"User Deleted Successfully"});
    } catch (error) {
        // Sending error response
        res.status(500).json({ message: error.message });
    }
}
