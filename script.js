/* ==========================
   NAVIGATION MENU
========================== */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const overlay = document.querySelector(".nav-overlay");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("show");
  overlay.classList.toggle("show");
});

overlay.addEventListener("click", () => {
  navLinks.classList.remove("show");
  hamburger.classList.remove("active");
  overlay.classList.remove("show");
});

document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
    hamburger.classList.remove("active");
    overlay.classList.remove("show");
  });
});

/* Smooth scrolling for internal links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ==========================
   PORTFOLIO FILTER + SEARCH
========================== */
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    portfolioItems.forEach(item => {
      const category = item.getAttribute("data-category");
      if (filter === "all" || category === filter) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });
  });
});

/* Search function */
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    portfolioItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(term)) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });
  });
}

/* ==========================
   LIGHTBOX (Image Viewer)
========================== */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightbox = document.querySelector(".close-lightbox");

if (lightbox && closeLightbox) {
  portfolioItems.forEach(item => {
    const img = item.querySelector("img");
    if (img) {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.style.display = "flex";
      });
    }
  });

  closeLightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.style.display = "none";
  });
}

const backToTop = document.getElementById("backToTop");

  window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  };

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  async function loadAverage() {
  const res = await fetch("https://ishow-feedback-backend-1.onrender.com/api/average-rating");
  const data = await res.json();
  document.getElementById("avgRating").textContent = data.average;
}