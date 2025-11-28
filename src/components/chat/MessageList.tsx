import { MessageSender } from '../../constants/chat.constants';
import { Message } from '../../hooks/useChat';

interface MessageListProps {
  messages: Message[];
  botUpdateText: string;
}

export const MessageList = ({ messages, botUpdateText }: MessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      {messages.map(
        (msg) =>
          msg.text.length > 0 && (
            <div
              key={msg.id}
              className={`flex ${msg.sender === MessageSender.User ? 'justify-end' : 'justify-start'
                }`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${msg.sender === MessageSender.User
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-white text-gray-800 shadow-sm rounded-bl-sm'
                  } ${msg?.isError ? '!bg-red-50 !text-red-600 border border-red-300 !shadow-none' : ''}`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ),
      )}

      {/* UPDATE / TYPING BUBBLE */}
      {botUpdateText && (
        <div className="flex justify-start">
          <div className="max-w-[75%] bg-white border border-blue-100 shadow-md rounded-2xl px-4 py-3 flex items-center gap-2 animate-pulse">
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce"></div>
            <p className="text-gray-700 text-sm font-medium">{botUpdateText}</p>
          </div>
        </div>
      )}
    </div>
  );
};
