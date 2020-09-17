import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export function Sidebar() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const data = await fetch("https://api-rel.kurtosys.app/readme/routes");
    const items = await data.json();

    // Sort API Data
    let sortedItems = [];
    Object.keys(items).forEach(function (key, index) {
      let title, endpoint, slug;
      let nested = [];
      title = key;
      slug = key.toLowerCase().replace(/\s/g, "-");

      if (typeof items[key] === "object") {
        Object.keys(items[key]).forEach(function (key2, index2) {
          nested.push({
            title: key2,
            endpoint: items[key][key2],
            slug: key2.toLowerCase().replace(/\s/g, "-"),
          });
        });
        endpoint = false;
      } else {
        endpoint = items[key];
        nested = false;
      }
      sortedItems.push({ title, endpoint, nested, slug });
    });
    console.log(sortedItems);
    setItems(sortedItems);
  };

  return (
    <Container>
      <h3>
        <NavLink activeClassName={"active"} exact to={"/"}>
          API Docs
        </NavLink>
      </h3>
      <ul>
        {items.map((obj) => {
          let res = obj.nested ? (
            <>
              <li>{obj.title}</li>
              <ul>
                {obj.nested.map((el) => (
                  <li>
                    <NavLink
                      activeClassName={"active"}
                      to={{
                        pathname: `/${obj.slug}/${el.slug}`,
                        state: { endpoint: el.endpoint },
                      }}
                    >
                      {el.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <li>
              <NavLink
                activeClassName={"active"}
                to={{ pathname: `/${obj.slug}`, state: { endpoint: obj.endpoint } }}
              >
                {obj.title}
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
`;
