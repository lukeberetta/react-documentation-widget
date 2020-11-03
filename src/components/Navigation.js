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
    <Container className={"left-panel navigation"}>
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
  max-height: 100vh;
  font-size: 14px;
  position: -webkit-sticky;
  position: sticky;
  top: 70px;
  overflow: auto;
  margin-bottom: 40px;
`;

const NavHeader = styled.p`
  padding: 0;
  margin: 14px 0 3px;
  color: #b0b8cb;
  font-size: 13px;
`;
