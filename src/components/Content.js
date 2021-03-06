import React, { useState, useEffect } from "react";
import { url } from "../config";
import "../Markdown.css";

export function Content(props) {
  useEffect(() => {
    // Fetch raw page
    const fetchPage = async () => {
      let path = props.endpoint || "";
      const fetchedPage = await fetch(`${url + path}?plainstyles=true`);
      const html = await fetchedPage.text();
      setPage(html);
      window.scrollTo(0, 0);
    };
    fetchPage();
  }, [props]);

  const [page, setPage] = useState();

  return (
    <div
      className={"markdown-body right-panel"}
      dangerouslySetInnerHTML={{ __html: page }}
    />
  );
}
