import { useEffect } from "react";

const SITE_URL = "https://sentrix-labs.com";

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

// Updates document.title, meta description, canonical link, and OG/Twitter
// tags on route change — needed because this is a client-rendered SPA with
// a single static index.html, so React Router alone won't touch <head>.
export default function useDocumentMeta({ title, description, path = "/" }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Sentrix` : "Sentrix — AI-verified physical security monitoring";
    const desc =
      description ||
      "Sentrix is an AI-verified command-and-control platform for physical security — deploy a full monitoring system yourself, no security expert needed.";
    const url = `${SITE_URL}${path}`;

    document.title = fullTitle;
    setMeta("name", "description", desc);
    setCanonical(url);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", desc);
  }, [title, description, path]);
}
