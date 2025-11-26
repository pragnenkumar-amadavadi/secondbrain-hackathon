import CollapsibleChatbot from "./components/chatbot.component";
import { EnterPriseToken } from "./constants";
import { AuthProvider } from "./contexts/authStore.contexts";

type AppProps = {
  enterpriseToken: EnterPriseToken;
  userToken: string;
};

function App({ enterpriseToken, userToken }: AppProps) {
  return (
    <AuthProvider initialValues={{ enterpriseToken, userToken }}>
      <CollapsibleChatbot />
    </AuthProvider>
  );
}

export default App;
