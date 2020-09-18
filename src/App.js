import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "./components/Container";
import { Navigation } from "./components/Navigation";
import { Content } from "./components/Content";
import "./App.css";
import getRoutes from "./utils/getRoutes";

function App() {
  const routes = getRoutes();

  return (
    <Router>
      <Container>
        <Navigation />
        <Switch>
          <Route path="/" exact component={Content} />
          {routes.map((route) => (
            <Route
              path={`/${route.path}`}
              exact
              render={() => <Content endpoint={route.endpoint} />}
            />
          ))}
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
