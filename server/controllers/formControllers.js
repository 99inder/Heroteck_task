import Form from "../models/Form.js";

export const submitForm = async (req, res) => {
    try {
        const { name,
            email,
            phone,
            countryCode,
        } = req.body;

        // Basic validations
        if (!name || !email || !phone || !countryCode) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all fields'
            });
        }

        // Create new form in DB
        await Form.create({
            name,
            email,
            phone,
            countryCode,
        });

        // Respond with success message
        return res.status(201).json({
            success: true,
            message: 'Form submitted successfully'
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Mongoose validation error occurred
            const firstError = Object.values(error.errors)[0].message;
            return res.status(400).json({
                success: false,
                message: firstError
            });
        }
        console.error('Error:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again later'
        });
    }
};