import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { getRoutes } from "../utils";
import { ReactComponent as Logomark } from "../assets/logomark.svg";

export function Navigation() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    getRoutes(setRoutes);
  }, []);

  return (
    <Container>
      <NavLink className={"logo"} activeClassName={"active"} exact to={"/"}>
        <Logomark className={"logomark"} />
        <p>Kurtosys API</p>
      </NavLink>
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
  padding: 24px 32px;
  width: 300px;
  height: 100%;
  position: fixed;
  overflow-y: scroll;
  border-right: 1px solid var(--grey-light);
`;

const NavHeader = styled.p`
  padding: 0;
  margin: 18px 0 4px -4px;
  opacity: 0.6;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 0.5px;
`;
