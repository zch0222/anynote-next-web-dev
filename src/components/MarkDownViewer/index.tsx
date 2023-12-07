'use client'

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import remarkMath from "remark-math";
import 'github-markdown-css/github-markdown-light.css'



import withThemeConfigProvider from "@/components/hoc/withThemeConfigProvider";


function MarkDownViewer({ content }: {
    content: string
}) {

    return (
        <div className="w-full h-full max-w-[800px]">
            <ReactMarkdown
                className={'markdown-body bg-white'}
                components={{
                    // @ts-ignore
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <SyntaxHighlighter
                                // @ts-ignore
                                style={vscDarkPlus}
                                language={match[1].toLowerCase()}
                                PreTag="div"
                                {...props}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
                remarkPlugins={[remarkGfm, remarkMath]}
            >
                {content ? content : ""}
            </ReactMarkdown>
        </div>
    )
}

export default withThemeConfigProvider(MarkDownViewer)
