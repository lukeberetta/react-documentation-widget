import React, { useState, useEffect } from "react";

export function IFrame(props) {
  useEffect(() => {
    fetchPage();
    console.log(props);
  }, [props]);

  const [page, setPage] = useState();

  const fetchPage = async () => {
    let path = props.endpoint || "";
    const fetchedPage = await fetch(
      `https://api-uk.kurtosys.app/readme/${path}?plainstyles=true`
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
