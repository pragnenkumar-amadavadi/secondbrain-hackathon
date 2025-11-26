import { createContext } from "react";
import { createAuthStore } from "../store/auth.store";
import { AuthStore } from "../types/auth.type";

type AuthStoreType = ReturnType<typeof createAuthStore>;

export const AuthStoreContext = createContext<AuthStoreType | null>(null);
type AuthProviderProps = {
  children: React.ReactNode;
  initialValues: AuthStore;
};

export const AuthProvider = ({
  children,
  initialValues: { enterpriseToken, userToken },
}: AuthProviderProps) => {
  const store = createAuthStore(); // new Zustand store instance
  store.setState({
    enterpriseToken: enterpriseToken,
    userToken: userToken,
  });
  return (
    <AuthStoreContext.Provider value={store}>
      {children}
    </AuthStoreContext.Provider>
  );
};
