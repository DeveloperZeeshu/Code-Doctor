'use client';

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Suspense, useEffect, useRef, useState } from "react";
import { FiCopy } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";

const CodeBlock = ({ className, value }) => {
    const language = className?.replace('language-', '') || 'text';
    const [copied, setCopied] = useState(false);
    const divRef = useRef();

    const handleCpy = async () => {
        try {
            const code = divRef.current.innerText;
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
        catch (err) {
            alert("Failed to copy!");
        }
    };

    return (
        <div className="bg-[#212121] rounded-3xl px-[.1rem]">
            <div className="w-full flex justify-end items-center px-[2rem] py-[.8rem] text-[white]">
                <button onClick={handleCpy} className="cursor-pointer text-[1.4rem]">{copied ? <span className="flex justify-between items-center gap-2"><FaCheck /> Copied!</span> : <span className="flex justify-between items-center gap-2"><FiCopy />Copy</span>}</button>
            </div>

            <div ref={divRef}>
                <SyntaxHighlighter
                    language={language || 'text'}
                    style={oneDark}
                    wrapLongLines
                    customStyle={{
                        borderBottomLeftRadius: '1.2rem',
                        borderBottomRightRadius: '1.2rem',
                        padding: '2rem',
                        margin: 0,
                    }}
                >
                    {String(value ?? '').trim()}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

const MarkDownViewer = ({ content, speed = 30 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const containerRef = useRef();

    useEffect(() => {
        let index = 0;
        const words = content.split(' ');

        const interval = setInterval(() => {
            if (index < words.length) {
                setDisplayedText((prev) => prev + (index === 0 ? '' : ' ') + words[index]);
                index++;
            } else
                clearInterval(interval);

        }, speed);

        return () => clearInterval(interval);
    }, [content, speed]);

    useEffect(() => {
        if (containerRef.current) {
            requestAnimationFrame(() => {
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
            });
        }
    }, [displayedText]);

    return (
        <div ref={containerRef}>
            <Suspense fallback={<div>Loading...</div>}>
                <Markdown children={displayedText}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        pre: ({ children }) => {
                            const codeElement = Array.isArray(children) ? children[0] : children;
                            const className = codeElement?.props?.className || '';
                            const language = className.replace('language-', '') || 'text';
                            let code = codeElement?.props?.children ?? '';

                            if (Array.isArray(code)) {
                                code = code.flat(Infinity).join('');
                            }

                            return <CodeBlock className={`language-${language}`} value={code} />;
                        },

                        p: ({ node, ...props }) => <p className=" not-first:mt-5 mb-6 leading-relaxed" {...props} />,
                        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold first:mt-0 my-6" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-2xl first:mt-0 font-semibold my-5" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-xl first:mt-0 font-semibold my-4" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc ml-6 flex flex-col gap-[1.4rem] mb-4" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal flex flex-col gap-[1.4rem] ml-6 mb-4" {...props} />,
                        blockquote: ({ node, ...props }) => (
                            <blockquote className="border-l-4 border-gray-400 pl-4 italic my-4" {...props} />
                        ),
                        strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
                    }}
                />
            </Suspense>
        </div>
    );
};

export default MarkDownViewer;


