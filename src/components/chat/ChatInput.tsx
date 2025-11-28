import { Send } from 'lucide-react';
interface ChatInputProps {
  message: string;
  setMessage: (msg: string) => void;
  onSend: () => void;
  textUpdates?: {
    inputText?: string;
    chatTitle?: string;
    chatSubtitle?: string;
  };
}

export const ChatInput = ({ message, setMessage, onSend, textUpdates }: ChatInputProps) => {
  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSend()}
          placeholder={textUpdates?.inputText || 'Type your message...'}
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-(--primary-hover)  focus:border-transparent text-sm"
        />
        <button
          onClick={onSend}
          className="bg-(--primary-color) text-white rounded-full p-2.5 hover:bg-(--primary-hover) transition-colors shadow-lg hover:shadow-xl"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
