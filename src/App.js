import React, { useEffect, useState } from "react";
import { BrowserRouter, HashRouter, Switch, Route } from "react-router-dom";
import { Container } from "./components/Container";
import { Navigation } from "./components/Navigation";
import { Content } from "./components/Content";
import "./App.css";
import { getRoutes } from "./utils";
import { MobileNavigation } from "./components/MobileNavigation";

function App(props) {
  const [routes, setRoutes] = useState([]);
  const { basename = "/api-documentation", hashrouter = true } = props;
  const Router = hashrouter ? HashRouter : BrowserRouter;

  useEffect(() => {
    getRoutes(setRoutes);
  }, []);

  return (
    <Router basename={hashrouter ? null : basename}>
      <Container className={"app-docs"}>
        <Navigation />
        <MobileNavigation />
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
