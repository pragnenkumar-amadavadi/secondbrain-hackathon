import { MessageCircle, X } from 'lucide-react';

interface ChatToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ChatToggle = ({ isOpen, onToggle }: ChatToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className="bg-(--primary-color) text-white rounded-full p-4 shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 relative group cursor-pointer self-end"
    >
      {isOpen ? (
        <X className="w-6 h-6" />
      ) : (
        <>
          <MessageCircle className="w-6 h-6" />
        </>
      )}
    </button>
  );
};
