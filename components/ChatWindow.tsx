'use client';

import { useState, useEffect } from 'react';
import Chat from './Chat';
import * as React from 'react';

export type Message = {
    messageId: string;
    content: string;
    role: 'user' | 'assistant';
};

const loadMessages = async (
    chatId: string,
    setMessages: (messages: Message[]) => void,
    setChatHistory: (history: [string, string][]) => void,
) => {
    const messages: Message[] = [
        { messageId: "1", content: "Hello this is a message from loadMessages()", role: 'user' },
    ];
    setMessages(messages);

    const history = messages.map((msg) => [msg.role, msg.content]) as [string, string][];
    setChatHistory(history);
};

const ChatWindow = () => {
    const [chatId, setChatId] = useState<string>('1');
    const [newChatCreated, setNewChatCreated] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [loading, setLoading] = useState(false);
    const [messageAppeared, setMessageAppeared] = useState(false);
    const [chatHistory, setChatHistory] = useState<[string, string][]>([]);
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (chatId && !newChatCreated && messages.length === 0) {
            loadMessages(chatId, setMessages, setChatHistory);
            setIsReady(true);
        }
    }, [chatId, newChatCreated, messages]);

    const sendMessage = async (message: string) => {
        if (loading) return;

        setLoading(true);
        setMessageAppeared(false);

        // Add user message
        const userMessageId = Date.now().toString();
        setMessages((prevMessages) => [
            ...prevMessages,
            { messageId: userMessageId, content: message, role: 'user' },
        ]);


        // Add assistant response
        const responseMessageId = (Date.now() + 1).toString();
        const responseMessage: Message = {
            messageId: responseMessageId,
            content: `This is a simulated reply, User said: ${message}`,
            role: 'assistant',
        };

        setMessages((prevMessages) => [...prevMessages, responseMessage]);
        setLoading(false);
        setMessageAppeared(true);
    };


    return isReady ? (
        <div>
            {messages.length > 0 ? (
                <Chat 
                    messages={messages} 
                    sendMessage={sendMessage} 
                    messageAppeared={messageAppeared} 
                    loading={loading}
                />
            ) : (
                <p>This is the empty chat</p>
            )}
        </div>
    ) : (
        <div className="flex flex-row items-center justify-center min-h-screen">
            <svg
                aria-hidden="true"
                className="w-8 h-8 text-light-200 fill-light-secondary dark:text-[#202020] animate-spin dark:fill-[#ffffff3b]"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M100 50.5908C100.003 78.2051 78.1951 100.003 50.5908 100C22.9765 99.9972 0.997224 78.018 1 50.4037C1.00281 22.7993 22.8108 0.997224 50.4251 1C78.0395 1.00281 100.018 22.8108 100 50.4251ZM9.08164 50.594C9.06312 73.3997 27.7909 92.1272 50.5966 92.1457C73.4023 92.1642 92.1298 73.4365 92.1483 50.6308C92.1669 27.8251 73.4392 9.0973 50.6335 9.07878C27.8278 9.06026 9.10003 27.787 9.08164 50.594Z"
                    fill="currentColor"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4037 97.8624 35.9116 96.9801 33.5533C95.1945 28.8227 92.871 24.3692 90.0681 20.348C85.6237 14.1775 79.4473 9.36872 72.0454 6.45794C64.6435 3.54717 56.3134 2.65431 48.3133 3.89319C45.869 4.27179 44.3768 6.77534 45.014 9.20079C45.6512 11.6262 48.1343 13.0956 50.5786 12.717C56.5073 11.8281 62.5542 12.5399 68.0406 14.7911C73.527 17.0422 78.2187 20.7487 81.5841 25.4923C83.7976 28.5886 85.4467 32.059 86.4416 35.7474C87.1273 38.1189 89.5423 39.6781 91.9676 39.0409Z"
                    fill="currentFill"
                />
            </svg>
        </div>
    );
};

export default ChatWindow;