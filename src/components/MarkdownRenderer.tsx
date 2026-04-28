"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { cn } from '@/lib/utils';
import { Reference } from './ReferenceTooltip';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert prose-blue max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-6 mt-10" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-white mb-4 mt-8 flex items-center gap-2" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-white mb-3 mt-6" {...props} />,
          p: ({ node, ...props }) => <p className="text-gray-300 leading-relaxed mb-4" {...props} />,
          ul: ({ node, ...props }) => <ul className="space-y-3 mb-6" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-5 space-y-3 mb-6 text-gray-300" {...props} />,
          li: ({ node, ...props }) => (
            <li className="flex gap-3 items-start">
              <span className="text-secondary mt-1.5">•</span>
              <span className="text-gray-300">{props.children}</span>
            </li>
          ),
          a: ({ node, ...props }) => {
            const href = props.href || '';
            if (href.startsWith('#')) {
              return <a className="text-primary hover:text-secondary underline decoration-primary/30 underline-offset-4 transition-colors" {...props} />;
            }
            return <a className="text-primary hover:text-secondary underline decoration-primary/30 underline-offset-4 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />;
          },
          strong: ({ node, ...props }) => <strong className="text-white font-bold" {...props} />,
          // Suporte para as marcações HTML customizadas (mark.yellow, mark.red, mark.gray)
          mark: ({ node, className, ...props }) => {
            const bgClass = {
              'yellow': 'bg-yellow-400/20 border-b border-yellow-400/40 text-yellow-100',
              'red': 'bg-red-500/20 border-b border-red-500/40 text-red-100',
              'gray': 'bg-gray-500/20 border-b border-gray-500/40 text-gray-100',
            }[className || 'yellow'];

            return (
              <span className={cn("px-1.5 py-0.5 rounded-sm transition-colors", bgClass)}>
                {props.children}
              </span>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
