'use client';

import { useState } from "react"
import Container from "../../../components/container/Container";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";
import H1 from "../../../components/ui/H1";
import P from "../../../components/ui/P";
import TextArea from "../../../components/ui/TextArea";
import { useForm } from "react-hook-form";
import { BugReport } from "./components/BugReport";

const BugReportGenerator = () => {
    const [report, setReport] = useState('');
    const { register, handleSubmit } = useForm()

    const submit = (data) => {
        console.log(data)
    }

    return (
        <>
            <Container>
                <H1
                    text='Bug Report Generator'
                />
                <P
                    text='AI-powered tool to find, explain, and document bugs in your code faster than ever.'
                />
                <form
                    onSubmit={handleSubmit(submit)}
                    className={`w-full lg:w-auto flex flex-col justify-center items-center gap-[2.5rem] bg-[#1d1c1cbc] rounded-[.8rem] mb-[3rem] p-[2rem]`}>

                    {/* Code Description */}
                    <div className="flex flex-col w-full">
                        <TextArea
                            label='📝 Bug Description'
                            placeholder="e.g., Type mismatch causing if-condition to fail"
                            className="lg:w-[80rem]"
                            {...register('description', {
                                required: true
                            })}
                        />
                    </div>

                    {/* Code Block */}
                    <div className="flex flex-col w-full">
                        <TextArea
                            label='💻 Code Snippet (if any)'
                            placeholder="Paste code related to the bug..."
                            className="lg:w-[80rem]"
                            {...register('code', {
                                required: true
                            })}
                        />
                    </div>

                    {/* Steps to Reproduce */}
                    <div className="flex flex-col w-full">
                        <TextArea
                            label='📋 Steps to Reproduce'
                            placeholder="e.g., 1. Open app → 2. Click Login → 3. Error appears"
                            className="lg:w-[80rem]"
                            {...register('steps', {
                                required: true
                            })}
                        />
                    </div>

                    {/* Environment */}
                    <div className="flex flex-col w-full">
                        <TextArea
                            label='🧪 Test Environment'
                            placeholder="e.g., Windows 11, Chrome v123.0, React 18.2.0"
                            className="lg:w-[80rem]"
                            {...register('environment', {
                                required: true
                            })}
                        />
                    </div>

                    {/* Severity Level */}
                    <div className="flex flex-col w-full max-w-full overflow-hidden">
                        <Select
                            label='🚨 Severity'
                            options={['Low', 'Medium', 'High', 'Critical']}
                            {...register('severity', {
                                required: true
                            })}
                        />
                    </div>

                    <div className="flex justify-center items-center gap-9 lg:w-[80rem]">
                        <Button
                            onClick={() => alert('Coming Soon...')}
                            text='Upload File'
                        />
                        <Button
                            type="submit"
                            text='Generate Report'
                        />
                    </div>
                </form>
                {report && <BugReport response={report} />}
            </Container>
        </>
    )
}

export default BugReportGenerator;
