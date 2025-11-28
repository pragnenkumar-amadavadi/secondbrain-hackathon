import { useChat } from '../hooks/useChat';
import { ChatHeader } from './chat/ChatHeader';
import { MessageList } from './chat/MessageList';
import { ChatInput } from './chat/ChatInput';
import { ChatToggle } from './chat/ChatToggle';
import { authStore } from '../store/auth.store';
import { ChatInfo } from './chat/ChatInfo';

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
    streaming
  } = useChat();
  const { memberId, enterpriseToken } = authStore.getState();

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-4">
      {/* Chat Window */}
      {isOpen && (
        <div
          className={`bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[80vh] sm:h-[500px]'
            } w-[calc(100vw-2rem)] sm:w-[420px] flex flex-col`}
        >
          <ChatHeader
            onMinimize={() => setIsMinimized(!isMinimized)}
            onClose={() => setIsOpen(false)}
            isMinimized={isMinimized}
            textUpdates={authStore.getState().textUpdates}
          />

          {memberId && enterpriseToken ? (
            !isMinimized &&
            <>
              <MessageList messages={messages} botUpdateText={botUpdateText} />
              <ChatInput isMessageStreaming={streaming} message={message} setMessage={setMessage} onSend={handleSend} textUpdates={authStore.getState().textUpdates} />
            </>
          ) : <ChatInfo />}
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
