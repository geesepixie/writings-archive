window.addEventListener('pageshow', function(event) {
  if (event.persisted) {
    // Page was loaded from bfcache (back-forward cache)
    window.location.reload();
  }
});
// ===========================
// Page transitions
// ===========================

// Handle link clicks using event delegation
document.body.addEventListener('click', function(e) {
  const link = e.target.closest('a');
  if (!link) return;

  const href = link.getAttribute('href');
  // Skip external links or anchors
  if (!href || href.startsWith('http') || href.startsWith('#')) return;

  const page = document.querySelector('.page-content');
  if (!page) return;

  e.preventDefault(); // stop immediate navigation

  // Add exit animation
  page.classList.add('page-exit-active');

  // Navigate after transition ends
  page.addEventListener('transitionend', () => {
    window.location.href = href;
  }, { once: true });
});

// Enter animation on page load
window.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('.page-content');
  if (!page) return;

  page.classList.add('page-enter');
  setTimeout(() => {
    page.classList.add('page-enter-active');
  }, 10);
});

// ===========================
// Essay loader
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  const essayList = document.querySelector(".essay-list");
  if (!essayList) return; // skip if page has no essay list

  fetch('library/groups.json')
    .then(response => response.json())
    .then(data => {
      essayList.innerHTML = "";
      data.sort((a, b) => b.date.localeCompare(a.date)).forEach(essay => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = essay.url;
        a.textContent = essay.title;

        if (essay.featured) {
          a.classList.add("featured");
        }

        const span = document.createElement("span");
        span.classList.add("date");
        span.textContent = `· ${essay.date}`;

        li.appendChild(a);
        li.appendChild(span);
        essayList.appendChild(li);
      });
    })
    .catch(err => console.error("Error loading essays:", err));
});
