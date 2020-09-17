import React, { useState, useEffect } from "react";

export function IFrame({ location }) {
  useEffect(() => {
    fetchPage();
    getEndpoint();
  }, [location]);

  const [page, setPage] = useState();

  const getEndpoint = () => (location.props ? location.props.endpoint : "/");

  const fetchPage = async () => {
    const fetchedPage = await fetch(
      `https://api-uk.kurtosys.app/readme/${getEndpoint()}?plainstyles=true`
    );
    const html = await fetchedPage.text();
    setPage(html);
    window.scrollTo(0, 0);
  };

  return (
    <div style={iframeStyles} dangerouslySetInnerHTML={{ __html: page }} />
  );
}

const leftNavigationWidth = "280px";

const iframeStyles = {
  width: `calc(95% - ${leftNavigationWidth})`,
  height: `100%`,
  padding: "24px",
  marginLeft: leftNavigationWidth,
};
