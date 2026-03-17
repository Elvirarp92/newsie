browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || message.type !== "fetchRss") return;
  const url = message.url

  if (!url) {
    sendResponse({ok: false, error: "No URL!"})
    return
  }

  fetch(url)
    .then((res) => res.text())
    .then((text) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "application/xml");
      const items = [...doc.querySelectorAll("item")].map((item) => ({
        title: item.querySelector("title")?.textContent,
        link: item.querySelector("link")?.textContent,
        pubDate: item.querySelector("pubDate")?.textContent,
        description: item.querySelector("description")?.textContent,
      }));

      sendResponse({ ok: true, items });
    })
    .catch((err) => {
      sendResponse({ ok: false, error: err.message });
    });

  // Keep the message channel open for async response.
  return true;

});