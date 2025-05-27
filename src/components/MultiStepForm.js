'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import TextInput from '@/components/TextInput';

export default function MultiStepForm(){
    const [step, setStep] = useState(1);

    //This the code that was used before using hook
    /*const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });*/

    const{
        register,
        handleSubmit,
        trigger,
        formState: {errors},
        getValues,
        watch,
    } = useForm();

    //New
    const totalSteps = 3;

    const handleNext = async () => {
        //let valid = false;
        let fieldsToValidate = [];

        //if (step === 1) valid = await trigger('name');
        if (step === 1) fieldsToValidate = ['firstName','lastName','dob'];
        //if (step === 2) valid = await trigger('email');
        if (step === 2) fieldsToValidate = ['email', 'phone'];
        //if (step === 3) valid = await trigger('password');
        if (step === 3) fieldsToValidate = ['password', 'confirmPassword'];

        const isValid = await trigger(fieldsToValidate);
        //if (valid) setStep((prev) => prev + 1)
        if (isValid) setStep((prev) => prev + 1);
    };

    const handleBack = () => setStep((prev) => prev - 1);

    //This the code that was used before using hook
    /*const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };*/

    //This the code that was used before using hook
    /*const onSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting data:', formData);
        //send to API
    };*/

    const onSubmit = (data) => {
        console.log('Submitting data:', data); //uses react-hook-form's form state
    };
    
    //value={formData.name} onChange={handleChange} 
    //value={formData.email} onChange={handleChange} 
    //value={formData.password} onChange={handleChange}

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-6 p-6 border rounded">
            {/* Stepper Dots */}
            <div className="flex justify-center space-x-2 mb-4">
                {Array.from({ length: totalSteps }).map((_, index) => (
                    <span
                        key={index}
                        className={`h-3 w-3 rounded-full ${
                            step === index + 1 ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                    ></span>
                ))}
            </div>
            
            {step === 1 && (
                <div>
                    <TextInput
                        name="name"
                        label="First Name"
                        placeholder="First Name"
                        {...register('firstName', { required: 'First name is required' })}
                        error={errors.firstName}
                    />                    

                    <label className="block mt-4">Last Name:</label>
                    <input {...register('lastName', { required: 'Last name is required' })}
                        className="border p-2 w-full"/>
                    {errors.lastName && (<p className="text-red-500">{errors.lastName.message}</p>)}

                    <label className="block mb-1">Date of Birth:</label>
                    <input
                        type="date"
                        {...register('dob', { required: 'Date of Birth is required' })}
                        className="border p-2 w-full rounded"
                    />
                    {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}

                </div>
            )}

            {step === 2 && (
                <div>
                    <label className="block">Email:</label>
                    <input name="email" className="border p-2 w-full"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /^\S+@\S+$/, message: 'Enter a valid email' },
                        })}/>
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                    <label className="block mt-4">Phone:</label>
                    <input
                        {...register('phone', {
                            required: 'Phone is required',
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: 'Enter a valid 10-digit phone number',
                            },
                        })}
                        className="border p-2 w-full"/>
                    {errors.phone && (<p className="text-red-500">{errors.phone.message}</p>)}
                </div>
            )}

            {step === 3 && (
                <div>
                    <label className="block">Password:</label>
                    <input 
                        name="password"
                        type="password"
                        className="border p-2 w-full"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: { value: 6, message: 'Password must be at least 6 characters' },
                        })}/>
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                    <label className="block mt-4">Confirm Password:</label>
                    <input type="password"
                        {...register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: (value) => value === watch('password') || 'Passwords do not match',
                        })}
                        className="border p-2 w-full"
                    />
                    {errors.confirmPassword && (<p className="text-red-500">{errors.confirmPassword.message}</p>)}
                </div>
            )}

            <div className="flex justify-between">
                {step > 1 && <button type="button" onClick={handleBack} className="bg-gray-300 px-4 py-2 rounded">Back</button>}
                {step < 3 && <button type="button" onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>}
                {step === 3 && <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>}
            </div>
        </form>
    );
}

/*
<label className="block">First Name:</label>
                    <input name="name" className="border p-2 w-full" 
                        {...register('firstName', { required: 'First name is required' })}/>
                    {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
*/