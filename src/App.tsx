import { useEffect } from 'react';
import CollapsibleChatbot from './components/chatbot.component';
import { authStore } from './store/auth.store';
import './index.css';

type AppProps = {
  enterpriseToken: string;
  userToken: string;
  memberId: string;
  baseApi: string;
};

function App({ enterpriseToken, userToken, memberId, baseApi }: AppProps) {
  useEffect(() => {
    if (!enterpriseToken || !userToken || !memberId || !baseApi) {
      return;
    }

    authStore.getState().setEnterpriseToken(enterpriseToken);
    authStore.getState().setUserToken(userToken);
    authStore.getState().setMemberId(memberId);
    authStore.getState().setBaseApi(baseApi);
  }, [enterpriseToken, userToken, memberId, baseApi]);

  return <CollapsibleChatbot />;
}

export default App;
