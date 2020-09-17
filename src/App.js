import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Main } from "./components/Main";
import { Sidebar } from "./components/Sidebar";
import { IFrame } from "./components/IFrame";
import "./App.css";
import getRoutes from "./utils/getRoutes";

function App() {
  const routes = getRoutes();

  return (
    <Router>
      <Main>
        <Sidebar />
        <Switch>
          <Route path="/" exact component={IFrame} />
          {routes.map((r) => (
            <Route
              path={`/${r.path}`}
              exact
              render={() => <IFrame endpoint={r.endpoint} />}
            />
          ))}
        </Switch>
      </Main>
    </Router>
  );
}

export default App;
