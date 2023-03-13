import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import CodeCopyBtn from './codeCopyBtn';

export default function PostBody({ content }) {
    // Add the CodeCopyBtn component to our PRE element
    const Pre = ({ children }) => <pre className="blog-pre">
        <CodeCopyBtn>{children}</CodeCopyBtn>
        {children}
    </pre>

    return (
        <ReactMarkdown
            className='post-markdown'
            linkTarget='_blank'
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={{
                pre: Pre,
                code({ node, inline, className = "blog-code", children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                        <SyntaxHighlighter
                            style={a11yDark}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                        >
                            {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    )
                }
            }}
        >
            {content}
        </ReactMarkdown>
    )
}

import React from "react";

export default function CodeCopyBtn({ children }) {
    const [copyOk, setCopyOk] = React.useState(false);

    const iconColor = copyOk ? '#0af20a' : '#ddd';
    const icon = copyOk ? 'fa-check-square' : 'fa-copy';

    const handleClick = (e) => {
        navigator.clipboard.writeText(children[0].props.children[0]);
        console.log(children)

        setCopyOk(true);
        setTimeout(() => {
            setCopyOk(false);
        }, 500);
    }

    return (
        <div className="code-copy-btn">
            <i className={`fas ${icon}`} onClick={handleClick} style={{color: iconColor}} />
        </div>
    )
}

