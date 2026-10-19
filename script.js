/* =====================================================
   CONFIGURATION — edit this block only.
   Leave a value as "" and its button shows as "not set yet".
   ===================================================== */
const CONFIG = {
  email: "nafissani20@gmail.com",
  github: "https://github.com/nafissani12-alt",
  linkedin: "https://www.linkedin.com/in/nafis-ahmed-b10616327/",
  instagram: "https://www.instagram.com/s_a__n__i_01/?hl=bn",
  facebook: "https://www.facebook.com/Nafis0188/",  

  education: {      
    "Univercity": "Tecnology Unite Of Dhaka Univercity",
    "School": "Tecnology Unite Of Dhaka Univercity",
    "College": "Ideal College Dhanmondi",
    "Expected graduation year": "2028"
  },

  projects: {       
    cafe:        { github: "https://github.com/nafissani12-alt/Cafe-Management-system", demo: "" },
    portfolio:   { github: "https://github.com/nafissani12-alt/my-portfolio", demo: "" },
    calculator:  { github: "https://github.com/nafissani12-alt/assignment-nafis", demo: "" },
    
  }
};

/* ---------- helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/** Builds a link, or a clearly disabled placeholder when no URL is set. */
function makeLink(label, url, cls = "") {
  const a = document.createElement(url ? "a" : "span");
  a.textContent = url ? label : `${label} (not set yet)`;
  a.className = cls + (url ? "" : " is-empty");
  if (url) {
    a.href = url;
    if (!url.startsWith("mailto:")) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
  } else a.setAttribute("aria-disabled", "true");
  return a;
}

const socials = () => [
  ["Email", CONFIG.email && `mailto:${CONFIG.email}`],
  ["GitHub", CONFIG.github], ["LinkedIn", CONFIG.linkedin],
  ["Instagram", CONFIG.instagram], ["Facebook", CONFIG.facebook]
];

/* ---------- render configurable content ---------- */
function renderLinks(listEl, withEmail) {
  socials().filter(([n]) => withEmail || n !== "Email").forEach(([name, url]) => {
    const li = document.createElement("li");
    li.append(makeLink(name, url));
    listEl.append(li);
  });
}
renderLinks($("#contact-links"), true);
renderLinks($("#footer-links"), false);

const edu = $("#education");
Object.entries(CONFIG.education).forEach(([k, v]) => {
  const dt = document.createElement("dt"), dd = document.createElement("dd");
  dt.textContent = k; dd.textContent = v || "Add your details in script.js";
  if (!v) dd.className = "muted";
  edu.append(dt, dd);
});

$$("[data-project]").forEach(card => {
  const cfg = CONFIG.projects[card.dataset.project] || {};
  const box = $(".links", card);
  box.append(makeLink("GitHub", cfg.github, "btn small ghost"), makeLink("Live Demo", cfg.demo, "btn small ghost"));
});

$("#year").textContent = new Date().getFullYear();

/* ---------- mobile menu ---------- */
const burger = $("#burger"), nav = $("#nav");
function setMenu(open) {
  nav.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
burger.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
$$("#menu a").forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

/* ---------- active nav link ---------- */
const links = $$("#menu a");
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    links.forEach(l => {
      const on = l.getAttribute("href") === "#" + en.target.id;
      l.classList.toggle("active", on);
      on ? l.setAttribute("aria-current", "true") : l.removeAttribute("aria-current");
    });
  });
}, { rootMargin: "-45% 0px -50% 0px" });
$$("[data-section]").forEach(s => spy.observe(s));

/* ---------- nav background after scroll ---------- */
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

/* ---------- reveal on scroll (skipped for reduced motion) ---------- */
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduce || !("IntersectionObserver" in window)) {
  $$(".reveal").forEach(el => el.classList.add("in"));
} else {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.12 });
  $$(".reveal").forEach(el => { el.classList.add("pre"); io.observe(el); });
}
