import { MessageCircle, Minus } from 'lucide-react';

interface ChatHeaderProps {
  onMinimize: () => void;
  onClose: () => void;
}

export const ChatHeader = ({ onMinimize }: ChatHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-white font-semibold">Chat Support</h3>
          <p className="text-blue-100 text-xs">We're here to help</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onMinimize}
          className="text-white hover:bg-blue-800 rounded-lg p-1.5 transition-colors cursor-pointer"
        >
          <Minus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
