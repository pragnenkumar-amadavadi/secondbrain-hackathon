type ChatRequestParams = {
  enterpriseId: string;
  conversationId: string;
};

type InitiateChatRequest = {
  member_uuid: string;
  title: string;
};

type InitiateChatResponse = {
  conversation_uuid: string;
  message: string;
};

type SendMessageRequest = {
  member_uuid: string;
  query: string;
};

export type InitiateChat = {
  request: {
    body: InitiateChatRequest;
    params: Omit<ChatRequestParams, 'conversationId'>;
  };
  response: InitiateChatResponse;
};

export type SendMessage = {
  request: {
    body: SendMessageRequest;
    params: ChatRequestParams;
  };
};
