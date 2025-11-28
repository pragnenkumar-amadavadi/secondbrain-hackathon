import { Send } from 'lucide-react';

interface ChatInputProps {
  message: string;
  setMessage: (msg: string) => void;
  onSend: () => void;
}

export const ChatInput = ({ message, setMessage, onSend }: ChatInputProps) => {
  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSend()}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
        <button
          onClick={onSend}
          className="bg-blue-600 text-white rounded-full p-2.5 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl cursor-pointer"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
