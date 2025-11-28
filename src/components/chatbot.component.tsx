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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* Chat Window */}
      {isOpen && (
        <div
          className={`bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[500px]'
            } w-[380px] flex flex-col`}
        >
          <ChatHeader
            onMinimize={() => setIsMinimized(!isMinimized)}
            onClose={() => setIsOpen(false)}
            isMinimized={isMinimized}
          />

          {memberId && enterpriseToken ? (
            !isMinimized &&
            <>
              <MessageList messages={messages} botUpdateText={botUpdateText} />
              <ChatInput isMessageStreaming={streaming} message={message} setMessage={setMessage} onSend={handleSend} />
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
