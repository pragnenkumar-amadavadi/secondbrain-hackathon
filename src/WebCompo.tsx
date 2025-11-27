import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

class ReactWrapper extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['enterprise-token', 'user-token', 'member-id', 'base_api'];
  }

  connectedCallback(): void {
    this._render();
  }

  private _render(): void {
    const root = ReactDOM.createRoot(this);
    const props = this._getProps();

    root.render(
      <App
        enterpriseToken={props.enterpriseToken}
        userToken={props.userToken}
        memberId={props.memberId}
        baseApi={props.baseApi}
      />,
    );
  }

  private _getProps(): {
    enterpriseToken: string;
    userToken: string;
    memberId: string;
    baseApi: string;
  } {
    return {
      enterpriseToken: this.getAttribute('enterprise-token') || '',
      userToken: this.getAttribute('user-token') || '',
      memberId: this.getAttribute('member-id') || '',
      baseApi: this.getAttribute('base_api') || 'https://dev.insurance.secondbrain.global/api/',
    };
  }
}

customElements.define('second-brain-chatbot', ReactWrapper);
