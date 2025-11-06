'use client'

import axios from "axios";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export const SignIn = () => {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const submit = async (data) => {
        try {
            const res = await axios.post('/api/auth/login', data)
            if (res.data.success) {
                console.log(res.data)
                toast.success('Logged In successfully.')
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
                    <h2 className="text-5xl lg:text-6xl pb-5 text-center">Welcome Back</h2>
                    <p className="text-[1.6rem]">Please Sign in to your account</p>
                </div>

                <form
                    onSubmit={handleSubmit(submit)}
                    className="w-[30rem] lg:w-[40rem] flex flex-col">
                    <div className="flex flex-col space-y-8">
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
                            placeholder='Enter your password.'
                            errors={errors.password}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters long'
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                                    message: 'Password must contain uppercase, lowercase, number, and special character'
                                }
                            })}
                        />

                        <p className="cursor-pointer text-blue-400 text-right text-2xl">Forgot Password?</p>
                    </div>

                    <Button
                        type="submit"
                        className="mt-[3rem] mb-[2rem]"
                    />
                </form>
                <p>Don't have an account? <span onClick={() => router.push('/auth/register')} className=" text-blue-400 cursor-pointer">Sign Up</span></p>
            </div>
        </>
    )
}
