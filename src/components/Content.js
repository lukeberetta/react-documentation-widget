import React, { useState, useEffect } from "react";
import "../Markdown.css";

export function Content(props) {
  useEffect(() => {
    // Fetch raw page
    const fetchPage = async () => {
      let path = props.endpoint || "";
      const fetchedPage = await fetch(
        `https://api-uk.kurtosys.app/readme/${path}?plainstyles=true`
      );
      const html = await fetchedPage.text();
      setPage(html);
      window.scrollTo(0, 0);
    };
    fetchPage();
  }, [props]);

  const [page, setPage] = useState();

  return (
    <div
      className={"markdown-body"}
      style={iframeStyles}
      dangerouslySetInnerHTML={{ __html: page }}
    />
  );
}

const leftNavigationWidth = "300px";

const iframeStyles = {
  width: `calc(95% - ${leftNavigationWidth})`,
  height: `100%`,
  padding: "48px",
  marginLeft: leftNavigationWidth,
};
