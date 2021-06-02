import ReactDOM from "react-dom";

import App from "@web/App";
import * as swr from "@web/serviceWorkerRegistration";

ReactDOM.render(<App />, document.getElementById("root"));

if (process.env.NODE_ENV === "production") swr.register();
else swr.unregister();
