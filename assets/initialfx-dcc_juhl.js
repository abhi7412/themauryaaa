import { s as d, S as n } from "./Navbar-DS5lOV2F.js";
import { g as e } from "./ScrollTrigger-0lJgtTtq.js";
import "./index-C8DqYLD8.js";
function c() {
  (document.body.style.overflowY = "auto");
  if (d && typeof d.paused === "function") d.paused(!1);
  const mEl = document.getElementsByTagName("main")[0];
  if (mEl) mEl.classList.add("main-active");
  e.to("body", { backgroundColor: "#050405", duration: 0.5, delay: 1 });
  var o = new n(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    { type: "chars,lines", linesClass: "split-line" },
  );
  e.fromTo(
    o.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    },
  );
  let a = { type: "chars,lines", linesClass: "split-h2" };
  var i = new n(".landing-h2-info", a);
  (e.fromTo(
    i.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    },
  ),
    e.fromTo(
      ".landing-info-h2",
      { opacity: 0, y: 30 },
      { opacity: 1, duration: 1.2, ease: "power1.inOut", y: 0, delay: 0.8 },
    ),
    e.fromTo(
      [".header", ".icons-section", ".nav-fade"],
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power1.inOut", delay: 0.1 },
    ));
  var t = new n(".landing-h2-info-1", a),
      t2 = new n(".landing-h2-info-2", a),
      r = new n(".landing-h2-1", a),
      s = new n(".landing-h2-2", a),
      s2 = new n(".landing-h2-3", a);
  (l(i, t, t2), l(r, s, s2));
}
function l(o, a, b) {
  var i = e.timeline({ repeat: -1, repeatDelay: 1 });
  const t = 4,
    r = t * 2 + 1,
    v = t * 3 + 2;
  i.fromTo(a.chars, { opacity: 0, y: 80 }, { opacity: 1, duration: 1.2, ease: "power3.inOut", y: 0, stagger: 0.1, delay: t }, 0)
   .fromTo(o.chars, { y: 0 }, { y: -80, duration: 1.2, ease: "power3.inOut", stagger: 0.1, delay: t }, 0)
   .fromTo(b.chars, { opacity: 0, y: 80 }, { opacity: 1, duration: 1.2, ease: "power3.inOut", y: 0, stagger: 0.1, delay: r }, 0)
   .to(a.chars, { y: -80, duration: 1.2, ease: "power3.inOut", stagger: 0.1, delay: r }, 0)
   .fromTo(o.chars, { opacity: 0, y: 80 }, { opacity: 1, duration: 1.2, ease: "power3.inOut", y: 0, stagger: 0.1, delay: v }, 0)
   .to(b.chars, { y: -80, duration: 1.2, ease: "power3.inOut", stagger: 0.1, delay: v }, 0);
}
export { c as initialFX };
