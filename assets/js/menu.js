const themeBtn = document.querySelector(".btn--theme");
const navToggle = document.querySelector(".header__nav-toggle");
const navBar = document.querySelector(".header__nav");
const navLinks = document.querySelectorAll(".header__nav .header__link");
const dropdowns = document.querySelectorAll(
  ".header__nav .header__dropdown-menu"
);
const overlay = document.createElement("div");
overlay.classList.add("overlay");

// Gets the current theme from local storage or the user's preferred color scheme
function getCurrentTheme() {
  let theme = window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
  localStorage.getItem("snap.theme")
    ? (theme = localStorage.getItem("snap.theme"))
    : null;
  return theme;
}

// Loads the specified theme and updates the UI accordingly
function loadTheme(theme) {
  const root = document.querySelector(":root");
  if (theme === "light") {
    themeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="var(--clr-neutral-100)"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  } else {
    themeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="var(--clr-neutral-100)" stroke="var(--clr-neutral-100)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78">
    </line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  }
  root.setAttribute("color-scheme", `${theme}`);
}

// Toggles between light and dark themes when the theme button is clicked
themeBtn.addEventListener("click", () => {
  let theme = getCurrentTheme();
  if (theme === "light") {
    theme = "dark";
  } else {
    theme = "light";
  }
  localStorage.setItem("snap.theme", `${theme}`);
  loadTheme(theme);
});

// Loads the current theme when the page has finished loading
window.addEventListener("DOMContentLoaded", () => {
  loadTheme(getCurrentTheme());
});

// Toggles the navigation menu when the menu button is clicked
navToggle.addEventListener("click", () => {
  const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", !isExpanded);
  navBar.classList.toggle("open");
  overlay.classList.toggle("visible");
  if (isExpanded) {
    document.body.style.overflow = "auto"; // Enable body scroll
  } else {
    document.body.style.overflow = "hidden"; // Disable body scroll
  }
});

// Adds overlay below navigation menu
document.querySelector(".header").appendChild(overlay);

//  Toggles the dropdown menu when a dropdown toggle is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const expanded = link.getAttribute("aria-expanded") === "true";
    link.setAttribute("aria-expanded", !expanded);
    e.stopPropagation();
  });
});

// Hides dropdown menu when other area is clicked
document.body.addEventListener("click", (e) => {
  dropdowns.forEach((dropdown) => {
    if (!dropdown.contains(e.target)) {
      const dropdownToggle = dropdown.previousElementSibling;
      dropdownToggle.setAttribute("aria-expanded", "false");
    }
  });
});
