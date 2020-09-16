import React, { useState, useEffect } from 'react';
import styled from "styled-components";

export function IFrame({ match }) {
  useEffect(() => {
    fetchItem();
  }, []);

  const [item, setItem] = useState({});

  const fetchItem = async () => {
    const fetchedItem = await fetch(`https://api-uk.kurtosys.app/readme${match.url}`);
    const item = await fetchedItem;
    setItem(item);
  }

  return (
    <Container>
      <div style={iframeStyles} dangerouslySetInnerHTML={{ __html: `<iframe height="100%" style="width: 100%;" src="https://api-uk.kurtosys.app/readme/${match.params.endpoint ? match.params.endpoint : ""}?plainstyles=true" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>` }} />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
`

const iframeStyles = { width: `100%`, height: `100%` }