import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { getRoutes } from "../utils";
export function Navigation() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    getRoutes(setRoutes);
  }, []);

  return (
    <Container className={"left-panel"}>
      <ul>
        {routes.map((routes) => (
          <ul>
            <li>
              {routes.endpoint ? (
                <NavLink
                  activeClassName={"active"}
                  exact
                  to={{
                    pathname: "/" + routes.path || "",
                    props: { endpoint: routes.endpoint },
                  }}
                >
                  {routes.title}
                </NavLink>
              ) : (
                <NavHeader>{routes.title}</NavHeader>
              )}
            </li>
          </ul>
        ))}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 24px 24px 0;
  max-height: 100vh;
  font-size: 14px;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  overflow: auto;
`;

const NavHeader = styled.h6`
  padding: 0;
  margin: 16px 0 4px;
  opacity: 0.6;
`;
