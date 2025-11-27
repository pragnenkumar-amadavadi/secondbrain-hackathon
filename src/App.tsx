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
  const authStoreInstance = authStore();

  useEffect(() => {
    if (!enterpriseToken || !userToken || !memberId || !baseApi) {
      return;
    }

    authStoreInstance.setEnterpriseToken(enterpriseToken);
    authStoreInstance.setUserToken(userToken);
    authStoreInstance.setMemberId(memberId);
    authStoreInstance.setBaseApi(baseApi);
  }, [enterpriseToken, userToken, memberId, baseApi, authStoreInstance]);

  return <CollapsibleChatbot />;
}

export default App;
