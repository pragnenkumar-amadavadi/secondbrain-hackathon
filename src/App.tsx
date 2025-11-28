import { useEffect } from 'react';
import CollapsibleChatbot from './components/chatbot.component';
import { authStore } from './store/auth.store';
import './index.css';
import { applyTheme } from './Utils/utils';

type AppProps = {
  enterpriseToken: string;
  userToken: string;
  memberId: string;
  baseApi: string;
  theme?: {
    [key: string]: string;
  };
  textUpdates?: {
    [key: string]: string;
  };
};

function App({ enterpriseToken, userToken, memberId, baseApi, theme, textUpdates }: AppProps) {
  useEffect(() => {
    if (!enterpriseToken || !userToken || !memberId || !baseApi) {
      return;
    }
    const { textUpdates: defaultTextUpdates } = authStore.getState();
    authStore.getState().setEnterpriseToken(enterpriseToken);
    authStore.getState().setUserToken(userToken);
    authStore.getState().setMemberId(memberId);
    authStore.getState().setBaseApi(baseApi);
    authStore.getState().setTextUpdates({ ...defaultTextUpdates, ...textUpdates });
  }, [enterpriseToken, userToken, memberId, baseApi, textUpdates]);

  console.log(theme,'theme')

  useEffect(() => {
    applyTheme({
      primaryColor: theme?.primaryColor || '#ff0000',
      secondaryColor: theme?.secondaryColor || '#fff',
      chatBotResponseBGColor: theme?.chatBotResponseBGColor || '',
      chatBotResponseTextColor: theme?.chatBotResponseTextColor || '',
    });
  }, [theme]);

  return <CollapsibleChatbot />;
}

export default App;

// theme : {
//   primaryColor: string;
//   secondaryColor: string;
//   chatBotResponseBGColor?: string;
//   chatBotResponseTextColor?: string;
// }

// textUpdates : {
//   chatTitle?: string;
//   chatSubtitle?: string;
//   inputText?: string;
// }
