import 'katex/dist/katex.min.css';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { MarkdownContainer } from './MarkdownRenderer.styled';

export interface MarkdownRendererProps {
    /**
     * The markdown text to render
     */
    content: string;
    /**
     * Additional CSS class name
     */
    className?: string;
    /**
     * Whether to enable GitHub Flavored Markdown features
     */
    enableGfm?: boolean;
    /**
     * Whether to enable math rendering with KaTeX
     */
    enableMath?: boolean;
}

const MarkdownRenderer = ({ content, className, enableGfm = true, enableMath = true }: MarkdownRendererProps) => {
    const plugins = [];

    if (enableGfm) {
        plugins.push(remarkGfm);
    }

    if (enableMath) {
        plugins.push(remarkMath);
    }

    const rehypePlugins = enableMath ? [rehypeKatex] : [];

    return (
        <MarkdownContainer className={className}>
            <ReactMarkdown remarkPlugins={plugins} rehypePlugins={rehypePlugins}>
                {content}
            </ReactMarkdown>
        </MarkdownContainer>
    );
};

export default MarkdownRenderer;
