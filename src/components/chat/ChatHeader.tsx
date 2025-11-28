import { ChevronDown, ChevronUp, MessageCircle, X } from 'lucide-react';

interface ChatHeaderProps {
  onMinimize: () => void;
  isMinimized?: boolean
  onClose: () => void;
  textUpdates?: {
    chatTitle?: string;
    chatSubtitle?: string;
    inputText?: string;
  };
}

export const ChatHeader = ({ onMinimize, textUpdates, isMinimized }: ChatHeaderProps) => {
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
          className="text-white hover:bg-(--primary-hover) rounded-lg p-1.5 transition-colors cursor-pointer"
        >
          {isMinimized ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>
    </div>
  );
};
