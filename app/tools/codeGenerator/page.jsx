'use client';

import { lazy, Suspense, useRef, useState } from "react"
import { getResponse } from "../../utils/GeminiRequest";
const MarkDownViewer = lazy(() => import('../../../components/ui/MarkDownViewer'));
import { getCodeGenPrompt } from "./utils/getCodeGenPrompt";
import Container from "../../../components/container/Container";
import Button from "../../../components/ui/Button";
import P from "../../../components/ui/P";
import H1 from "../../../components/ui/H1";
import Input from "../../../components/ui/Input";
import TextArea from "../../../components/ui/TextArea";
import { useForm } from "react-hook-form";

const WriteCode = () => {
    const [generatedCode, setGeneratedCode] = useState('');
    const [message, setMessage] = useState([]);
    const { register, handleSubmit } = useForm()

    const submit = (data) => {
        console.log(data)
    }

    return (
        <>
            <Container>
                <H1
                    text='Code Generator'
                />
                <P
                    text='AI-powered tool to Generate high quality code as per your need.'
                />
                {<div className="flex gap-[4rem] flex-col items-end w-full lg:w-[80rem] ">
                    {
                        message.map((msg, idx) => (
                            <div key={idx} className={msg.role === 'user' ? "bg-[#282828] rounded-4xl h-auto w-auto max-w-[50rem] px-[2rem] py-[1rem]" : 'bg-[#191919] rounded-4xl h-auto divres w-full lg:w-[80rem] lg:px-[3rem] px-[1rem] py-[3rem] last:mb-[15rem]'}>
                                {msg.role === 'user' ? msg.text :
                                    <Suspense fallback={<div>Loading..</div>}>
                                        <MarkDownViewer content={msg.text} />
                                    </Suspense>
                                }
                            </div>
                        ))
                    }
                </div>
                }

                <div className={generatedCode ? 'rounded-t-4xl fixed bottom-0 bg-[#0e0d0d] px-[3.2rem] w-full lg:w-[80rem]' : 'bg-[#0e0d0d] rounded-t-4xl w-full'}>
                    <form
                        onSubmit={handleSubmit(submit)}
                        className={` flex pb-6 flex-col justify-center items-center gap-[2rem]`}>
                        <TextArea
                            placeholder="e.g., Create an Login Form, etc."
                            className='lg:w-[80rem]'
                            {...register('query', {
                                required: true
                            })}
                        />
                        <div className="flex justify-center items-center gap-9">
                            <div className="w-[15rem]">
                                <Input
                                    type="text"
                                    placeholder="Language?"
                                    {...register('language', {
                                        required: true
                                    })}
                                />
                            </div>
                            <Button
                                type="submit"
                                text='Generate'
                            />
                        </div>
                    </form>
                </div>
            </Container>
        </>
    )
}

export default WriteCode;
