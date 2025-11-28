import { useChat } from '../hooks/useChat';
import { ChatHeader } from './chat/ChatHeader';
import { MessageList } from './chat/MessageList';
import { ChatInput } from './chat/ChatInput';
import { ChatToggle } from './chat/ChatToggle';
import { authStore } from '../store/auth.store';

export default function CollapsibleChatbot() {
  const {
    isOpen,
    setIsOpen,
    isMinimized,
    setIsMinimized,
    message,
    setMessage,
    messages,
    botUpdateText,
    handleSend,
  } = useChat();

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div
          className={`bg-white rounded-2xl shadow-2xl mb-4 overflow-hidden transition-all duration-300 ${
            isMinimized ? 'h-16' : 'h-[80vh] sm:h-[500px]'
          } w-[calc(100vw-2rem)] sm:w-[420px] flex flex-col`}
        >
          <ChatHeader
            onMinimize={() => setIsMinimized(!isMinimized)}
            onClose={() => setIsOpen(false)}
            textUpdates={authStore.getState().textUpdates}
          />

          {!isMinimized && (
            <>
              <MessageList messages={messages} botUpdateText={botUpdateText} />
              <ChatInput
                message={message}
                setMessage={setMessage}
                onSend={handleSend}
                textUpdates={authStore.getState().textUpdates}
              />
            </>
          )}
        </div>
      )}

      {/* Toggle Button */}
      <ChatToggle
        isOpen={isOpen}
        onToggle={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
      />
    </div>
  );
}
