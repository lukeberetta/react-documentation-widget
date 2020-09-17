import React, { useState, useEffect } from "react";

export function IFrame({ match }) {
  useEffect(() => {
    fetchPage();
    console.log(match);
  }, [match.url]);

  const [page, setPage] = useState();

  const fetchPage = async () => {
    const fetchedPage = await fetch(
      `https://api-uk.kurtosys.app/readme${match.url}?plainstyles=true`
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
