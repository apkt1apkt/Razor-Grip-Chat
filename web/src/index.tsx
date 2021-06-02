import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "@web/App";
import AuthProvider from "@web/auth/AuthProvider";
import * as swr from "@web/serviceWorkerRegistration";

ReactDOM.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>,
  document.getElementById("root")
);

if (process.env.NODE_ENV === "production") swr.register();
else swr.unregister();
