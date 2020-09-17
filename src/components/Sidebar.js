import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export function Sidebar() {
  useEffect(() => {
    fetchRoutes();
  }, []);

  const [routes, setRoutes] = useState([]);

  const fetchRoutes = async () => {
    const data = await fetch("https://api-rel.kurtosys.app/readme/routes");
    const routes = await data.json();

    // Sort API Data
    let sortedRoutes = [];
    Object.keys(routes).forEach(function (key, index) {
      let title, endpoint, slug;
      let nested = [];
      title = key;
      slug = key.toLowerCase().replace(/\s/g, "-");

      if (typeof routes[key] === "object") {
        Object.keys(routes[key]).forEach(function (key2, index2) {
          nested.push({
            title: key2,
            endpoint: routes[key][key2],
            slug: slug + "/" + key2.toLowerCase().replace(/\s/g, "-"),
          });
        });
        endpoint = false;
      } else {
        endpoint = routes[key];
        nested = false;
      }
      sortedRoutes.push({ title, endpoint, nested, slug });
    });
    console.log(sortedRoutes);
    setRoutes(sortedRoutes);
  };

  return (
    <Container>
      <h3>
        <NavLink activeClassName={"active"} exact to={"/"}>
          API Docs
        </NavLink>
      </h3>
      <ul>
        {routes.map((routes) => {
          let res = routes.nested ? (
            <>
              <li>{routes.title}</li>
              <ul>
                {routes.nested.map((nestedRoutes) => (
                  <li>
                    <NavLink
                      activeClassName={"active"}
                      to={`/${nestedRoutes.endpoint}`}
                    >
                      {nestedRoutes.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <li>
              <NavLink activeClassName={"active"} to={`/${routes.endpoint}`}>
                {routes.title}
              </NavLink>
            </li>
          );
          return res;
        })}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  padding: 24px;
  width: 260px;
  height: 100%;
  font-size: 14px;
  position: fixed;
`;
