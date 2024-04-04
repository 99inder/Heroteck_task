import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'react-toastify';
import { submitForm } from '../../apis/operations/formAPI';
import Spinner from '../common/Spinner';

export default function Form() {

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        countryCode: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePhoneChange = (phone, country) => {
        setFormData(prevState => ({
            ...prevState,
            phone,
            countryCode: country.countryCode
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await submitForm(formData);
            if (data.success) {
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    countryCode: ''
                });
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className='px-3 md:px-0 md:w-1/3'>
                <div>
                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">Callback Request Form</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Please fill this form & we'll get back to you at the earliest.
                    </p>
                </div>
                <form
                    className='mt-4 md:mt-10'
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Name
                        </label>
                        <input
                            className="px-2 mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            id="name"
                            type="text"
                            name="name"
                            autoComplete="given-name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            minLength="3"
                            maxLength="30"
                            pattern="[a-zA-Z\s]+"
                            title="Name should contain only alphabets and spaces, and be between 3 to 30 characters in length."
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <input
                            className="px-2 mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            pattern="[a-z0-9.]+@[a-z0-9.-]+\.[a-z]{2,4}"
                            title="Email should be in a valid format"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                            Phone
                        </label>
                        <PhoneInput
                            country={'us'}
                            inputClass="px-2 mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            required
                        />
                    </div>

                    <div className="mt-10 md:mt-6 flex items-center justify-end">
                        <button
                            type="submit"
                            className="w-1/3 md:min-w-[75px] md:w-fit rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            disabled={loading} // Disable button when loading is true
                        >
                            {
                                loading ?
                                    <div className='w-full h-full flex items-center justify-center'>
                                        <div className='h-full flex items-center w-[15px] '>
                                            <Spinner />
                                        </div>
                                    </div> :
                                    'Submit'
                            }
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};
