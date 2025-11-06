'use client';

import { useRouter } from "next/navigation";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

export const SignUp = () => {
    const router = useRouter()
    const { register, watch, handleSubmit, formState: { errors } } = useForm()

    const submit = async (data) => {
        try {
            const res = await axios.post('/api/auth/register', data)
            if (res.data.success) {
                console.log(res.data)
                toast.success('Registration successful.')
            }
        } catch (err) {
            if (err.response) {
                console.log(err.response.data)
                toast.error(err.response.data.message)
            } else if (err.request) {
                console.log(err.request)
                toast.error(err.request.message)
            } else
                console.log(err.message)
        }
    }

    return (
        <>
            <div className="text-[1.7rem] text-white flex flex-col items-center justify-center bg-[#1d1c1cbc] rounded-[.8rem] p-[3rem]">

                <div className="pb-[5rem]">
                    <h2 className="text-5xl lg:text-6xl pb-5 text-center">Sign Up</h2>
                    <p className="text-[1.6rem]">Create your account to get started</p>
                </div>

                <form
                    onSubmit={handleSubmit(submit)}
                    className="w-[30rem] lg:w-[40rem] flex flex-col">
                    <div className="flex flex-col space-y-8">
                        <Input
                            label='Full Name'
                            type="text"
                            errors={errors.name}
                            placeholder='Enter your full name.'
                            {...register('name', {
                                required: 'Full name is required'
                            })}
                        />
                        <Input
                            label='Email'
                            type="email"
                            errors={errors.email}
                            placeholder='Enter your email.'
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email address'
                                }
                            })}
                        />
                        <Input
                            label='Password'
                            type="password"
                            errors={errors.password}
                            placeholder='Enter your password.'
                            {...register('password', {
                                required: 'Enter a password',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be atleast 8 characters long'
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                                    message: 'Password must contain uppercase, lowercase, number, and special character'
                                }
                            })}
                        />
                        <Input
                            label='Confirm Password'
                            type="password"
                            errors={errors.confirmPassword}
                            placeholder='Enter your password.'
                            {...register('confirmPassword', {
                                required: 'Confirm your password',
                                validate: (value) =>
                                    value === watch('password') || "Password didn't match"
                            })}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="mt-[4.5rem] mb-[3rem]"
                    />
                </form>
                <p>Already have an account? <span onClick={() => router.push('/auth/login')} className=" text-blue-400 cursor-pointer">Sign In</span></p>
            </div>
        </>
    )
}


