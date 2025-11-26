import { create } from "zustand";
import { AuthStore } from "../types/auth.type";

export const createAuthStore = () =>
    create<AuthStore>((set) => ({
        enterpriseToken: null,
        userToken: null,
        setEnterpriseToken: (token) => set({ enterpriseToken: token }),
        setUserToken: (token) => set({ userToken: token }),
    }));
