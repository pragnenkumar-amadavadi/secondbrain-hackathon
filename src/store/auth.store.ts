import { create } from 'zustand';
import { AuthStore } from '../types/auth.type';

// Create ONE global store instance
export const authStore = create<AuthStore>((set) => ({
  enterpriseToken: null,
  userToken: null,
  setEnterpriseToken: (token) => set({ enterpriseToken: token }),
  setUserToken: (token) => set({ userToken: token }),
  conversationId: undefined,
  setConversationId: (id: string) => set({ conversationId: id }),
  memberId: undefined,
  setMemberId: (id: string) => set({ memberId: id }),
  baseApi: '',
  setBaseApi: (id: string) => set({ baseApi: id }),
}));
