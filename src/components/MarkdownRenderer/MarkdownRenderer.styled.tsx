import React from 'react';

interface MarkdownContainerProps {
    children: React.ReactNode;
    className?: string;
}

export const MarkdownContainer = ({ children, className = '' }: MarkdownContainerProps) => {
    return (
        <div
            className={`
            prose prose-slate max-w-none
            prose-headings:font-semibold prose-headings:text-gray-900
            prose-h1:text-4xl prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-2 prose-h1:mt-6 prose-h1:mb-3
            prose-h2:text-3xl prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2 prose-h2:mt-6 prose-h2:mb-3
            prose-h3:text-2xl
            prose-h4:text-xl
            prose-h5:text-lg
            prose-h6:text-base prose-h6:text-gray-500
            prose-p:mb-6 prose-p:leading-relaxed
            prose-code:bg-gray-200 prose-code:text-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-gray-100 prose-pre:text-gray-800 prose-pre:p-4 prose-pre:rounded-md prose-pre:text-xs prose-pre:overflow-x-auto
            prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:text-gray-500 prose-blockquote:italic
            prose-table:w-full prose-table:border-collapse
            prose-th:bg-gray-100 prose-th:p-3 prose-th:border prose-th:border-gray-300 prose-th:font-semibold
            prose-td:p-3 prose-td:border prose-td:border-gray-300
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-img:max-w-full prose-img:h-auto prose-img:rounded-lg
            prose-hr:my-8 prose-hr:border-gray-300
            ${className}
        `}
        >
            {children}
        </div>
    );
};
