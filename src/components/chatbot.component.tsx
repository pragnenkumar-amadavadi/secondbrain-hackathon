import { useState } from 'react';
import { MessageCircle, X, Send, Minus } from 'lucide-react';
import { MessageSender } from '../constants/chat.constants';
import { authStore } from '../store/auth.store';
import { ChatApi } from '../api/chat.api';
import { parseEndpoint } from '../helpers/common.helper';
import { ENDPOINTS, QUERY_PATH } from '../constants/endpoint.constants';

export default function CollapsibleChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [botUpdateText, setBotUpdateText] = useState('');
  const [messages, setMessages] = useState<
    {
      id: number | string;
      text: string;
      sender: MessageSender;
    }[]
  >([{ id: 1, text: 'Hi! How can I help you today?', sender: MessageSender.Bot }]);

  const simulateBotResponse = async () => {
    const { conversationId, memberId, enterpriseToken, setConversationId } = authStore.getState();
    let convoId = conversationId;
    if (!memberId || !enterpriseToken) return;
    if (!conversationId) {
      const initiateChatResponse = await ChatApi.initiateChat({
        body: {
          title: message,
          member_uuid: memberId,
        },
        params: {
          enterpriseId: enterpriseToken,
        },
      });
      setConversationId(initiateChatResponse.data.conversation_uuid);
      convoId = initiateChatResponse.data.conversation_uuid;
    }
    let botMessageId = messages.length + 1;

    setMessages((prev) => {
      botMessageId = prev.length + 1;
      return [...prev, { id: botMessageId, text: '', sender: MessageSender.Bot }];
    });
    const body = {
      member_uuid: memberId,
      query: message,
      stream: true,
      citations: true,
    };

    const baseApi = authStore.getState().baseApi;
    const response = await fetch(
      parseEndpoint(baseApi + ENDPOINTS.SEND_MESSAGE, {
        [QUERY_PATH.CONVERSATION_ID]: convoId!,
        [QUERY_PATH.ENTERPRISE_ID]: enterpriseToken,
      }),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.body) return;

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    let done = false;
    let buffer = '';

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;

      if (!value) {
        continue;
      }

      buffer += decoder.decode(value, { stream: !done });

      let newlineIndex = buffer.indexOf('\n');
      while (newlineIndex !== -1) {
        const rawLine = buffer.slice(0, newlineIndex).trim();
        buffer = buffer.slice(newlineIndex + 1);

        if (rawLine) {
          // Try to extract JSON object from the line (handles prefixes like "delta ")
          const jsonStart = rawLine.indexOf('{');
          if (jsonStart !== -1) {
            const jsonPart = rawLine.slice(jsonStart);
            try {
              const parsed = JSON.parse(jsonPart) as {
                type?: string;
                value?: string;
              };
              if (parsed.type === 'update') {
                const text = parsed.value;
                setBotUpdateText(text || '');
              } else if (
                parsed.type === 'message' &&
                parsed.value &&
                parsed.value !== '[START]' &&
                parsed.value !== '[DONE]'
              ) {
                setBotUpdateText('');

                const text = parsed.value;
                setMessages((prev) => {
                  return prev.map((message) => {
                    if (message.id !== botMessageId) {
                      return message;
                    }

                    return { ...message, text: message.text + text };
                  });
                });
              }
            } catch {
              // Ignore lines that are not valid JSON
            }
          }
        }

        newlineIndex = buffer.indexOf('\n');
      }
    }
  };
  const handleSend = async () => {
    const { memberId, enterpriseToken } = authStore.getState();
    if (message.trim()) {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: message, sender: MessageSender.User },
      ]);
      setMessage('');

      if (!memberId || !enterpriseToken) return;
      simulateBotResponse();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div
          className={`bg-white rounded-2xl shadow-2xl mb-4 overflow-hidden transition-all duration-300 ${
            isMinimized ? 'h-16' : 'h-[500px]'
          } w-[380px] flex flex-col`}
        >
          {/* Header */}
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
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-blue-800 rounded-lg p-1.5 transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-blue-800 rounded-lg p-1.5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map(
                  (msg) =>
                    msg.text.length > 0 && (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.sender === MessageSender.User ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                            msg.sender === MessageSender.User
                              ? 'bg-blue-600 text-white rounded-br-sm'
                              : 'bg-white text-gray-800 shadow-sm rounded-bl-sm'
                          }`}
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

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4 bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={handleSend}
                    className="bg-blue-600 text-white rounded-full p-2.5 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 relative group"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              1
            </span>
          </>
        )}
      </button>
    </div>
  );
}
