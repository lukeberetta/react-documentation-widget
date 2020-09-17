import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import getRoutes from "../utils/getRoutes";

export function Sidebar() {
  useEffect(() => {}, []);

  const routes = getRoutes();
  console.log(routes);

  return (
    <Container>
      <code>
        <NavLink activeClassName={"active"} exact to={"/"}>
          Kurtosys API
        </NavLink>
      </code>
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
  padding: 24px;
  width: 270px;
  height: 100%;
  font-size: 14px;
  position: fixed;
  overflow-y: scroll;
`;

const NavHeader = styled.p`
  padding: 0;
  margin: 8px 0 4px -8px;
  opacity: 0.5; ;
`;
