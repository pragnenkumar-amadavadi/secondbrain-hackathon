import { MessageCircle, Minus } from 'lucide-react';

interface ChatHeaderProps {
  onMinimize: () => void;
  onClose: () => void;
  textUpdates?: {
    chatTitle?: string;
    chatSubtitle?: string;
    inputText?: string;
  };
}

export const ChatHeader = ({ onMinimize, textUpdates }: ChatHeaderProps) => {
  return (
    <div className="p-4 flex items-center justify-between bg-(--primary-color)">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white">
          <MessageCircle className="w-6 h-6 text-(--primary-color)" />
        </div>
        <div>
          <h3 className="font-semibold text-(--secondary-color)">
            {textUpdates?.chatTitle || 'Chat Support'}
          </h3>
          <p className="text-xs text-(--secondary-color) opacity-70">
            {textUpdates?.chatSubtitle || `We're here to help`}
          </p>
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
