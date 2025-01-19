'use client';

import React, { MutableRefObject } from 'react';
import { Message } from './ChatWindow';
import { cn } from '../lib/utils';
import Markdown from 'markdown-to-jsx';

const MessageBox = ({
    message,
    messageIndex,
    loading,
    history,
    dividerRef,
    isLast,
    sendMessage,
}: {
    message: Message;
    messageIndex: number;
    loading: boolean;
    history: Message[];
    dividerRef?: MutableRefObject<HTMLDivElement | null>;
    isLast: boolean;
    sendMessage: (message: string) => void;
}) => {
    return (
        <div ref={isLast ? dividerRef : undefined}>
            {message.role === 'user' && (
                <div className={cn('w-full', messageIndex === 0 ? 'pt-16' : 'pt-8')}>
                    <h2 className="text-black dark:text-white font-medium text-3xl lg:w-9/12">
                        {message.content}
                    </h2>
                </div>
            )}

            {message.role === 'assistant' && (
                <div className="flex flex-col space-y-6 w-full lg:w-9/12">
                    <Markdown
                        className={cn(
                            'prose prose-h1:mb-3 prose-h2:mb-2 prose-h2:mt-6 prose-h2:font-[800] prose-h3:mt-4 prose-h3:mb-1.5 prose-h3:font-[600] dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 font-[400]',
                            'max-w-none break-words text-black dark:text-white',
                        )}
                    >
                        {message.content}
                    </Markdown>
                </div>
            )}
        </div>
    );
};

export default MessageBox;