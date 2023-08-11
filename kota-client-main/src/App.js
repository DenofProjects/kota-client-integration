import React from "react";
import "./App.css";
import store from "./store";
import { Provider } from "react-redux";
import MainView from "./views/mainView";

function App() {
  return (
    <Provider store={store}>
      <MainView />
    </Provider>
  );
}

export default App;
