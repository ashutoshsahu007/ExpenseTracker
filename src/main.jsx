import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthContextProvider } from "./store/auth-context";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthContextProvider>
  </BrowserRouter>
);
