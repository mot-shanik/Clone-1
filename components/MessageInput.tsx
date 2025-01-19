import { cn } from '@/lib/utils';
import { ArrowUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';


const MessageInput = ({
    sendMessage,
}: {
    sendMessage: (message: string) => void;
}) => {
    const [message, setMessage] = useState('');
    const [textareaRows, setTextareaRows] = useState(1);
    const [mode, setMode] = useState<'multi' | 'single'>('single');
    useEffect(() => {
        if( textareaRows >= 2 && mode === 'single' && message){ 
            setMode('multi');
        }
        else if(!message && mode === 'multi'){
            setMode('multi');
        }
    }, [message, textareaRows, mode]);

    const inputRef = useRef<HTMLTextAreaElement |null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const activeElement = document.activeElement;

            const isInputFocused = 
                activeElement?.tagName === 'INPUT' ||
                activeElement?.tagName === 'TEXTAREA' ||
                activeElement?.hasAttribute('contenteditable');
        };

        document.addEventListener('keydown', handleKeyDown);

        return () =>{ document.removeEventListener('keydown', handleKeyDown) };
    }, []);

    return (
        <form 
            onSubmit = {(e) => {
                e.preventDefault();
                sendMessage(message);
                setMessage('');
            }}
            onKeyDown={(e) => {
                if(e.key === 'Enter' && !e.shiftKey){
                    e.preventDefault();
                    sendMessage(message);
                    setMessage('');
                }
            }}
            className = {cn(
                'bg-light-secondary dark:bg-dark-secondary p-4 flex items-center overflow-hidden border border-light-200 dark:border-dark-200',
                mode === 'multi' ? 'flex-col rounded-lg' : 'flex-row rounded-full',
                )}
        >
            <TextareaAutosize
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onHeightChange={(height, props) => {
                    setTextareaRows(Math.ceil(height / props.rowHeight));
                }}
                className="transition bg-transparent dark:placeholder:text-white/50 placeholder:text-sm text-sm dark:text-white resize-none focus:outline-none w-full px-2 max-h-24 lg:max-h-36 xl:max-h-48 flex-grow flex-shrink"
                placeholder="Ask a follow-up"
            />
            {mode === 'single' && (
                <div className="flex flex-row items-center justify-between w-full pt-2">
                    <div className="flex flex-row items-center space-x-4">
                        <button 
                            disabled={message.trim().length === 0}
                            className="bg-[#24A0ED] text-white disabled:text-black/50 dark:disabled:text-white/50 hover:bg-opacity-85 transition duration-100 disabled:bg-[#e0e0dc79] dark:disabled:bg-[#ececec21] rounded-full p-2"
                            >
                                <ArrowUp className = "bg-background" size = {17}/>
                            </button>
                    </div>
                </div>
            )}

            {mode === 'multi' && (
                <div className="flex flex-row items-center justify-between w-full pt-2">
                    <div className = "flex flex-row items-center space-x-4" > 
                        <button
                            disabled={message.trim().length === 0}
                            className="bg-[#24A0ED] text-white text-black/50 dark:disabled:text-white/50 hover:bg-opacity-85 transition duration-100 disabled:bg-[#e0e0dc79] dark:disabled:bg-[#ececec21] rounded-full p-2"
                        >
                            <ArrowUp className  = "bg-background" size = {17}/>
                        </button>
                    </div>
                </div>
            )}        
        </form>
    );
};

export default MessageInput;

