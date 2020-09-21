import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "./components/Container";
import { Navigation } from "./components/Navigation";
import { Content } from "./components/Content";
import "./App.css";
import { getRoutes } from "./utils";

function App() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    getRoutes(setRoutes);
  }, []);

  return (
    <Router basename="/api-documentation">
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
