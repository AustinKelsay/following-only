function updateTabs() {
  // Select all tabs
  const tabs = Array.from(document.querySelectorAll('a[role="tab"]'));

  // Find the 'For You' tab and remove it
  const forYouTab = tabs.find(
    (tab) => tab.innerText.trim().toLowerCase() === "for you"
  );

  // Find the div that the 'For You' tab is in
  const presentationTabs = document.querySelectorAll(
    'div[role="presentation"]'
  );

  // If the presentation tab has no children, remove it
  presentationTabs.forEach((tab) => {
    if (tab.children.length === 0) {
      tab.parentNode.removeChild(tab);
    }
  });

  // Check if the 'For You' tab exists before removing
  if (forYouTab) {
    forYouTab.parentNode.removeChild(forYouTab);
  }

  // Find the 'Following' tab, change its text, and select it
  const followingTab = tabs.find(
    (tab) => tab.innerText.trim().toLowerCase() === "following"
  );

  if (followingTab) {
    // grab the child of the child of the child from this node since to get the text
    const tabText = followingTab.childNodes[0].childNodes[0].childNodes[0];
    // Change the text to 'Following Only'
    tabText.innerText = "Following Only";

    // Make the tab full width
    followingTab.style.width = "100%";

    followingTab.click();
  }
}

// Initial update of tabs
updateTabs();

// Use a MutationObserver to detect changes in the page structure
// Twitter uses a SPA structure, so we have to check when the page changes
const observer = new MutationObserver(updateTabs);

observer.observe(document.body, { childList: true, subtree: true });
