export const QUERY_PATH = {
  ENTERPRISE_ID: 'enterprise_uuid',
  CONVERSATION_ID: 'conversation_id',
};

const ENTERPRISE_API = `secondbrain/v1/enterprises/:${QUERY_PATH.ENTERPRISE_ID}/`;

export const ENDPOINTS = {
  INITIATE_CHAT: ENTERPRISE_API + 'conversations',
  SEND_MESSAGE: ENTERPRISE_API + `conversations/:${QUERY_PATH.CONVERSATION_ID}/messages`,
};
