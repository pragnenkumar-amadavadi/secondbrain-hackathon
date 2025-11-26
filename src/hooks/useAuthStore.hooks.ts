import { useContext } from "react";
import { AuthStoreContext } from "../contexts/authStore.contexts";
import { AuthStore } from "../types/auth.type";

export function useAuthStore<T>(selector: (state: AuthStore) => T): T {
    const store = useContext(AuthStoreContext);

    if (!store) {
        throw new Error("useAuthStore must be used inside <AuthProvider>");
    }

    return store(selector);
}
