import React, { useState, useEffect } from 'react';

export function IFrame({ match, location }) {
  console.log(match, location);
  useEffect(() => {
    fetchPage();
  });

  const { endpoint = "" } = location.state || {};

  const [item, setItem] = useState();
  const fetchPage = async () => {
    const fetchedPage = await fetch(`https://api-uk.kurtosys.app/readme/${endpoint}?plainstyles=true`);
    const item = await fetchedPage.text();
    setItem(item);
  }

  return (
    <div style={iframeStyles} dangerouslySetInnerHTML={{ __html: item }} />
  );
}

const iframeStyles = {
  width: `100%`, height: `100%`, overflow: 'scroll', padding: "24px"
}