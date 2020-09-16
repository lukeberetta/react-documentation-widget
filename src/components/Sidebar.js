import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";

export function Sidebar() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const data = await fetch('https://api-rel.kurtosys.app/readme/routes');
    const items = await data.json();

    // Sort API Data
    let sortedItems = []
    Object.keys(items).forEach(function (key, index) {
      let title, endpoint;
      let nested = [];
      title = key;

      if (typeof items[key] === 'object') {
        Object.keys(items[key]).forEach(function (key2, index2) {
          nested.push({ title: key2, endpoint: items[key][key2] })
        });
        endpoint = false;
      } else {
        endpoint = items[key];
        nested = false;
      };
      sortedItems.push({ title, endpoint, nested })
    });

    setItems(sortedItems);
  }

  return (
    <Container>
      <Link to={"/"}><h3>API Docs</h3></Link>
      <ul>
        {items.map(obj => {
          let res = obj.nested ?
            <><li>{obj.title}</li><ul>{obj.nested.map(el => (<li><Link to={`/${el.endpoint}`}>{el.title}</Link></li>))}</ul></> :
            <li><Link to={`/${obj.endpoint}`}>{obj.title}</Link></li>
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
`