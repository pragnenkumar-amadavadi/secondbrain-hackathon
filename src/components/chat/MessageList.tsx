import { useEffect, useRef } from 'react';
import { MessageSender } from '../../constants/chat.constants';
import { Message } from '../../hooks/useChat';
import { MarkdownRenderer } from '../MarkdownRenderer';

interface MessageListProps {
  messages: Message[];
  botUpdateText: string;
}

export const MessageList = ({ messages, botUpdateText }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, botUpdateText]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      {messages.map(
        (msg) =>
          msg.text.length > 0 && (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === MessageSender.User ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === MessageSender.User && (
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 bg-(--primary-color) text-white rounded-br-sm`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              )}

              {msg.sender === MessageSender.Bot && (
                <div className="max-w-[80%] rounded-2xl px-4 py-2.5 bg-(--chatBotResponseBGColor) text-(--chatBotResponseTextColor) shadow-sm rounded-bl-sm overflow-x-auto">
                  <MarkdownRenderer content={msg.text} enableGfm={true} enableMath={true} />
                </div>
              )}
            </div>
          ),
      )}

      {/* UPDATE / TYPING BUBBLE */}
      {botUpdateText && (
        <div className="flex justify-start">
          <div className="max-w-[75%] bg-white border border-blue-100 shadow-md rounded-2xl px-4 py-3 flex items-center gap-2 animate-pulse">
            <div className="w-2.5 h-2.5 bg-(--primary-color) rounded-full animate-bounce"></div>
            <p className="text-gray-700 text-sm font-medium">{botUpdateText}</p>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
