import { apiCall } from '../api-manager';
import { ENDPOINTS, QUERY_PATH } from '../constants/endpoint.constants';
import { parseEndpoint } from '../helpers/common.helper';
import { InitiateChat } from '../types/chat.type';

const initiateChat = ({ body, params }: InitiateChat['request']) => {
  const url = parseEndpoint(ENDPOINTS.INITIATE_CHAT, {
    [QUERY_PATH.ENTERPRISE_ID]: params.enterpriseId,
  });
  return apiCall<InitiateChat['response'], InitiateChat['request']['body']>({
    url,
    method: 'POST',
    data: body,
  }).then((response) => {
    return response;
  });
};

export const ChatApi = {
  initiateChat,
};
