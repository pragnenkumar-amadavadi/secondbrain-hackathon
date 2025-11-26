import ReactDOM from "react-dom/client";
import App from "./App";
import { EnterPriseToken } from "./constants";

class ReactWrapper extends HTMLElement {
  static get observedAttributes() {
    return ["enterprise-token", "user-token"];
  }

  connectedCallback() {
    const root = ReactDOM.createRoot(this);
    root.render(
      <App
        enterpriseToken={
          this.getAttribute("enterprise-token") as EnterPriseToken
        }
        userToken={this.getAttribute("user-token") as string}
      />
    );
  }
}

customElements.define("second-brain-chatbot", ReactWrapper);
