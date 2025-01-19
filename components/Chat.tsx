'use client'

import { Fragment, useEffect, useRef, useState } from 'react';
import MessageInput from './MessageInput';
import { Message } from './ChatWindow';
import MessageBox from './MessageBox';
import MessageBoxLoading from './MessageBoxLoading';

const Chat = ({
    messages,
    sendMessage,
    messageAppeared,
}:{
    messages: Message[];
    sendMessage: (message: string) => void;
    messageAppeared: boolean;
}) => {
    const [dividerWidth, setDividerWidth] = useState(0);
    const dividerRef = useRef<HTMLDivElement | null>(null);
    const messageEnd = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const UpdateDividerWidth = () => {
            if (dividerRef.current) {
                setDividerWidth(dividerRef.current.scrollWidth);
            }
        };

        UpdateDividerWidth();

        window.addEventListener('resize', UpdateDividerWidth);

        return () => {
            window.removeEventListener('resize', UpdateDividerWidth);
        }
    });

    useEffect(() => {
        messageEnd.current?.scrollIntoView({ behavior: 'smooth' });

        if(messages.length === 1){
            document.title = `${messages[0].content.substring(0, 30)} - Perplexica Clone` ;
        }
    }, [messages]);

    return(
        <div className = "flex flex-col space-y-6 pt-8 pb-44 lg:pb:32 sm:mx-4 md:mx-8">
            {/* Iterates over all messages and uses map to apply a function that renders them. */};
            {messages.map((msg, i) => {
                const isLast = i == messages.length -1;

                return(
                    <Fragment key={i}>
                        <MessageBox 
                        key={i}
                        message={msg}
                        messageIndex={i}
                        history={messages}
                        isLast={isLast}
                        dividerRef={isLast ? dividerRef : undefined}
                        sendMessage={sendMessage}
                        />
                        {!isLast && msg.role === 'assistant' && (
                            <div className="h-px w-full bg-light-secondary dark:bg-dark-secondary" />
                        )}
                    </Fragment>
                    );
                })
            }
            {!messageAppeared && <MessageBoxLoading />}
            <div ref={messageEnd} className="h-0"/>
            {dividerWidth > 0 && (
                <div className = "bottom-24 lg:bottom-10 fixed z-40"
                style={{ width: dividerWidth }}>
                    <MessageInput sendMessage={sendMessage} />
                </div>
            )}
            
        </div>
    );
};

export default Chat;
