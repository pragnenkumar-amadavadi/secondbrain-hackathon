import { useState } from 'react';
import { MessageSender } from '../constants/chat.constants';
import { authStore } from '../store/auth.store';
import { ChatApi } from '../api/chat.api';
import { parseEndpoint } from '../helpers/common.helper';
import { ENDPOINTS, QUERY_PATH } from '../constants/endpoint.constants';

export interface Message {
  id: number | string;
  text: string;
  sender: MessageSender;
}

export const useChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [botUpdateText, setBotUpdateText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hi! How can I help you today?', sender: MessageSender.Bot },
  ]);

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
      // Note: simulateBotResponse uses 'message' state which might be empty after setMessage('') if not careful.
      // However, looking at original code:
      // setMessage('');
      // simulateBotResponse();
      // inside simulateBotResponse: const body = { query: message ... }
      // This looks like a bug in the original code because setState is async/batched, but 'message' in closure might be stale or updated.
      // Actually, 'message' in simulateBotResponse comes from the state variable in the closure of that render? No, it's a function defined in the component.
      // Wait, in the original code:
      // const simulateBotResponse = async () => { ... query: message ... }
      // handleSend: setMessage(''); simulateBotResponse();
      // If simulateBotResponse uses 'message' state, and it's called after setMessage(''), it might use the old value if it captures it from the closure, OR the new empty value if it reads fresh state (which it can't easily without refs).
      // BUT, since simulateBotResponse is defined in the component body, it captures 'message' from the render scope.
      // When handleSend runs, it calls simulateBotResponse from the SAME render scope. So 'message' is the value at the time of render (the typed message).
      // So it works!
      // I will keep it as is to preserve behavior, but I should be aware.

      // Wait, I need to pass the message to simulateBotResponse or use a ref if I move it to a hook?
      // In the hook, simulateBotResponse is defined inside the hook.
      // handleSend calls setMessage('') then simulateBotResponse().
      // Same logic applies. It captures 'message' from the current render scope.

      simulateBotResponse();
    }
  };

  return {
    isOpen,
    setIsOpen,
    isMinimized,
    setIsMinimized,
    message,
    setMessage,
    messages,
    botUpdateText,
    handleSend,
  };
};
