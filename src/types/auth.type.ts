export type EnterPriseTokenT = string | null;

export type UserTokenT = string | null;

export type AuthStore = {
  enterpriseToken: EnterPriseTokenT;
  userToken: UserTokenT;
  memberId?: string;
  setMemberId: (id: string) => void;
  setEnterpriseToken: (token: EnterPriseTokenT) => void;
  setUserToken: (token: UserTokenT) => void;
  conversationId?: string;
  setConversationId: (id: string) => void;
  baseApi: string;
  setBaseApi: (id: string) => void;
  textUpdates: {
    chatTitle?: string;
    chatSubtitle?: string;
    inputText?: string;
  };
  setTextUpdates: (updates: {
    chatTitle?: string;
    chatSubtitle?: string;
    inputText?: string;
  }) => void;
};
