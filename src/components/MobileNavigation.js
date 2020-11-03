import React, { useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import { getRoutes } from "../utils";
import { NavLink } from "react-router-dom";

export function MobileNavigation() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    getRoutes(setRoutes);
  }, []);

  return (
    <div className="mobile-navigation">
      <Collapsible
        trigger={<p id="navigation-title">Select Category</p>}
        easing="ease-in-out"
        id="hello"
      >
        <div className="mobile-navigation-inner">
          {routes.map((route) => (
            <>
              {route.parent ? null : (
                <Collapsible trigger={route.title} easing="ease-in-out">
                  <ul id={"navigation-links"}>
                    {routes.map((r) => {
                      return r.parent === route.path ? (
                        <li>
                          <NavLink
                            activeClassName={"active"}
                            exact
                            to={{
                              pathname: "/" + r.path || "",
                              props: { endpoint: r.endpoint },
                            }}
                          >
                            {r.title}
                          </NavLink>
                        </li>
                      ) : null;
                    })}
                  </ul>
                </Collapsible>
              )}
            </>
          ))}
        </div>
      </Collapsible>
    </div>
  );
}
