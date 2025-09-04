import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import PostsList from "./Features/Posts/PostsList";
import { fetchUsers } from "./Features/Users/usersSLice"; // import your async thunk
import "./index.css";
import App from "./App";

// Dispatch users BEFORE rendering the app

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
