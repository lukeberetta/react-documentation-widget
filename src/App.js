import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Main } from "./components/Main";
import { Sidebar } from "./components/Sidebar";
import { IFrame } from "./components/IFrame";
import './App.css';

function App() {
  return (
    <Router>
      <Main>
        <Sidebar />
        <Switch>
          <Route path="/" exact component={IFrame} />
          <Route path="/:endpoint" exact component={IFrame} />
        </Switch>
      </Main>
    </Router>
  );
}

export default App;