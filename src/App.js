import React, { useEffect, useState } from "react";
import { BrowserRouter, HashRouter, Switch, Route } from "react-router-dom";
import { Container } from "./components/Container";
import { Navigation } from "./components/Navigation";
import { Content } from "./components/Content";
import "./App.css";
import { getRoutes } from "./utils";

function App(props) {
  const [routes, setRoutes] = useState([]);
  const { basename = "/api-documentation", hashrouter = false } = props;
  const Router = hashrouter ? HashRouter : BrowserRouter;

  useEffect(() => {
    getRoutes(setRoutes);
  }, []);

  return (
    <Router basename={basename}>
      <Container>
        <Navigation />
        <Switch>
          {routes.map((route) => (
            <Route
              path={`/${route.path}`}
              exact
              render={() => <Content endpoint={route.endpoint} />}
            />
          ))}
          <Route path="/" component={Content} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
