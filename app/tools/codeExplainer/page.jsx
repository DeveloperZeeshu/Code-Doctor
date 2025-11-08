'use client';

import { lazy, Suspense, useState } from "react"
const MarkDownViewer = lazy(() => import('../../../components/ui/MarkDownViewer'));

import Container from "../../../components/container/Container";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";
import H1 from "../../../components/ui/H1";
import P from "../../../components/ui/P";
import TextArea from "../../../components/ui/TextArea";
import { useForm } from "react-hook-form";
import { getExplanationPrompt } from "./utils/getExplanationPrompt.js";
import { getResponse } from "../../utils/GeminiRequest.js";

const CodeExplainer = () => {
    const [explainResponse, setExplainResponse] = useState('');
    const [message, setMessage] = useState([]);
    const { register, handleSubmit, reset } = useForm()

    const submit = async (data) => {
        try {
            const prompt = getExplanationPrompt(data.code, data.level)

            const result = await getResponse(prompt)

            const userMessage = { role: 'user', text: data.code };
            const aiResponse = { role: 'ai', text: result };

            setMessage((prev) => [...prev, userMessage, aiResponse]);
            setExplainResponse(result);

            reset()

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Container>
                <H1
                    text='Code Explainer'
                />
                <P
                    text='AI-powered tool that helps you to understand Complex Code Snippets Instantly.'
                />
                <div className="flex gap-[4rem] flex-col items-end w-full lg:w-[80rem]">
                    {
                        message.map((msg, idx) => (
                            <div key={idx} className={msg.role === 'user' ? "bg-[#282828] rounded-4xl h-auto w-auto max-w-[50rem] px-[2rem] py-[1rem]" : 'bg-[#191919] rounded-4xl h-auto w-full divres lg:w-[80rem] lg:px-[3rem] px-[1rem] py-[3rem] last:mb-[15rem]'}>
                                {msg.role === 'user' ? msg.text :
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <MarkDownViewer content={msg.text} />
                                    </Suspense>}
                            </div>
                        ))
                    }
                </div>

                <div className={explainResponse ? 'rounded-t-4xl fixed bottom-0 bg-[#0e0d0d] px-[3.2rem] w-full lg:w-[80rem]' : 'bg-[#0e0d0d] rounded-t-4xl w-full'}>
                    <form
                        className={` flex pb-6 flex-col justify-center items-center gap-[2rem]`}
                        onSubmit={handleSubmit(submit)}>
                        <TextArea
                            placeholder="Paste your code here..."
                            className='lg:w-[80rem]'
                            {...register('code', {
                                required: true
                            })}
                        />
                        <div className="flex justify-between items-center gap-9 lg:w-[80rem]">
                            <div className="w-[16.5rem] lg:w-[18rem] bg-[#282828] rounded-[.6rem]">
                                <Select
                                    options={['Beginner', 'Intermediate', 'Advance']}
                                    {...register('level', {
                                        required: true
                                    })}
                                />
                            </div>
                            <Button
                                type="submit"
                                text='Explain'
                            />
                        </div>
                    </form>
                </div>
            </Container>
        </>
    )
}

export default CodeExplainer;

