import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

class ReactWrapper extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['enterprise-token', 'user-token', 'member-id', 'base_api', 'theme' , 'textUpdates'];
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
        theme={props.theme}
        textUpdates={props.textUpdates}
      />,
    );
  }

  private _getProps(): {
    enterpriseToken: string;
    userToken: string;
    memberId: string;
    baseApi: string;
    theme: Record<string, string>;
    textUpdates: Record<string, string>;
  } {
    return {
      enterpriseToken: this.getAttribute('enterprise-token') || '',
      userToken: this.getAttribute('user-token') || '',
      memberId: this.getAttribute('member-id') || '',
      baseApi: this.getAttribute('base_api') || 'https://dev.insurance.secondbrain.global/api/',
      // Parse theme attribute JSON string if present, otherwise use empty object
      theme: (() => {
        const attr = this.getAttribute('theme');
        if (!attr) return {} as Record<string, string>;
        try {
          const parsed = JSON.parse(attr);
          // Ensure the parsed object is a simple string map
          if (typeof parsed === 'object' && parsed !== null) {
            return parsed as Record<string, string>;
          }
          return {} as Record<string, string>;
        } catch {
          console.warn('Invalid theme JSON');
          return {} as Record<string, string>;
        }
      })(),
      textUpdates: (() => {
        const attr = this.getAttribute('textUpdates');
        if (!attr) return {} as Record<string, string>;
        try {
          const parsed = JSON.parse(attr);
          // Ensure the parsed object is a simple string map
          if (typeof parsed === 'object' && parsed !== null) {
            return parsed as Record<string, string>;
          }
          return {} as Record<string, string>;
        } catch {
          console.warn('Invalid textUpdates JSON');
          return {} as Record<string, string>;
        }
      })(),
    };
  }
}

customElements.define('second-brain-chatbot', ReactWrapper);
