const schemeBtn = document.getElementById("schemeBtn");
const savedScheme = localStorage.getItem("scheme");

// Restore saved theme
if (savedScheme === "midnight") {
  document.body.classList.replace("scheme-daylight", "scheme-midnight");
  schemeBtn.textContent = "🌕";
} else {
  document.body.classList.replace("scheme-midnight", "scheme-daylight");
  schemeBtn.textContent = "🌑";
}

schemeBtn.addEventListener("click", () => {
  const body = document.body;

  if (body.classList.contains("scheme-midnight")) {
    body.classList.replace("scheme-midnight", "scheme-daylight");
    schemeBtn.textContent = "🌑";

    localStorage.setItem("scheme", "daylight");
  } else {
    body.classList.replace("scheme-daylight", "scheme-midnight");
    schemeBtn.textContent = "🌕";

    localStorage.setItem("scheme", "midnight");
  }
});

const menuToggle = document.getElementById("menuToggle");
const navContainer = document.getElementById("navContainer");

menuToggle.addEventListener("click", () => {
  navContainer.classList.toggle("is-active");
  menuToggle.textContent = navContainer.classList.contains("is-active")
    ? "✕"
    : "☰";
});

document
  .querySelectorAll(".top__link, .top__cv-btn, .top__cta")
  .forEach((link) => {
    link.addEventListener("click", () => {
      navContainer.classList.remove("is-active");
      menuToggle.textContent = "☰";
    });
  });
