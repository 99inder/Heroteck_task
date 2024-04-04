import axios from 'axios';
import { formEndpoints } from '../apis';

const { SUBMIT_FORM_API } = formEndpoints;

export const submitForm = async (formData) => {
    try {
        const response = await axios.post(SUBMIT_FORM_API, formData);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        if(error.response) {
            return error.response.data
        }
        throw new Error('Server error. Please try again later.');
    }
};