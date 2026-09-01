import { inject as vercelAnalytics, track } from "@vercel/analytics";
import { dict, applyLang, navigateToLang } from "./modules/i18n.ts";

(function () {
  "use strict";
  const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  vercelAnalytics();

  // ── header scroll ──
  const hd = document.getElementById("topbar");
  if (hd) {
    function onScroll() {
      hd.classList.toggle("sc", window.scrollY > 30);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ── decode effect ──
  function decodeText(el, target, delay) {
    if (!target) return;
    if (RM) { el.textContent = target; return; }
    if (el._decodeRaf) cancelAnimationFrame(el._decodeRaf);
    const glyphs = "▓▒░#%&@ABDEHKMNPRSTUVXZ0123456789";
    setTimeout(function () {
      let frame = 0;
      const len = target.length;
      (function tick() {
        frame++;
        const reveal = Math.floor(frame * 0.55);
        let out = "";
        for (let c = 0; c < len; c++) {
          const ch = target[c];
          if (ch === " " || ch === "·" || ch === "✦") { out += ch; continue; }
          out += c < reveal ? ch : glyphs[(Math.random() * glyphs.length) | 0];
        }
        el.textContent = out;
        if (reveal <= len) el._decodeRaf = requestAnimationFrame(tick);
        else el.textContent = target;
      })();
    }, delay || 0);
  }
  function decode(el, delay) {
    decodeText(el, el.getAttribute("data-decode"), delay);
  }
  document.querySelectorAll("[data-decode]").forEach(function (el, i) {
    decode(el, 200 + i * 500);
  });

  // ── decode effect au survol (menu + liens) ──
  function attachLinkDecode() {
    document.querySelectorAll(".nav a, main a, footer a").forEach(function (a) {
      if (a.children.length) return;                  // ancres avec svg/span/kbd : on saute
      if (a.closest(".btn, .logo, .lang-switch, .search-trigger")) return;
      const txt = (a.textContent || "").trim();
      if (!txt || txt.length > 70) return;
      a._decodeTxt = txt;
      a.addEventListener("mouseenter", function () { decodeText(a, a._decodeTxt, 0); });
      a.addEventListener("mouseleave", function () {
        if (a._decodeRaf) cancelAnimationFrame(a._decodeRaf);
        a.textContent = a._decodeTxt;
      });
    });
  }
  attachLinkDecode();

  // ── reveal on scroll ──
  const io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".rv, .lm").forEach(function (el) { io.observe(el); });

  // ── counters ──
  function runCounter(el) {
    const t = parseInt(el.getAttribute("data-count"), 10);
    if (RM) { el.textContent = t; return; }
    const dur = 1500;
    let start = null;
    function step(now) {
      if (start === null) start = now;
      const p = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(t * e);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  const cio = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { runCounter(e.target); cio.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll("[data-count]").forEach(function (el) { cio.observe(el); });

  // ── bascule de langue FR/EN (texte d'interface) ── via src/scripts/modules/i18n.ts
  (function langSwitch() {
    const isEnUrl = window.location.pathname === "/en" || window.location.pathname.startsWith("/en/");
    const initialLang = isEnUrl ? "en" : "fr";
    applyLang(initialLang);
    try { localStorage.setItem("lang", initialLang); } catch (e) {}

    document.querySelectorAll(".lang-switch, #langSwitch, #langSwitchPanel").forEach(function (sw) {
      sw.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const opt = e.target && e.target.closest ? e.target.closest(".lang-opt, [data-lang]") : null;
        const chosenLang = opt ? opt.getAttribute("data-lang") : null;
        navigateToLang(chosenLang);
      });
    });
  })();

  // ── bascule de thème clair/sombre ──
  (function themeSwitch() {
    const root = document.documentElement;
    const btn = document.getElementById("themeToggle");
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    function current() { return root.getAttribute("data-theme") === "dark" ? "dark" : "light"; }
    function apply() {
      root.setAttribute("data-theme", current());
      if (btn) {
        btn.setAttribute("aria-pressed", String(current() === "dark"));
        var isEnPage = document.documentElement.lang === "en";
        btn.title = current() === "dark"
          ? (isEnPage ? "Switch to light mode" : "Passer en mode clair")
          : (isEnPage ? "Switch to dark mode" : "Passer en mode sombre");
      }
    }
    if (btn) {
      btn.addEventListener("click", function () {
        const next = current() === "dark" ? "light" : "dark";
        try { localStorage.setItem("theme", next); } catch (e) {}
        root.setAttribute("data-theme", next);
        apply();
      });
    }
    if (mq && mq.addEventListener) {
      mq.addEventListener("change", function () {
        let stored = null;
        try { stored = localStorage.getItem("theme"); } catch (e) {}
        if (!stored) apply();
      });
    }
  })();

  // ── scrollspy : met en surbrillance le lien de nav de la section visible ──
  (function scrollspy() {
    const links = Array.from(document.querySelectorAll("#topbar .nav a"));
    if (!links.length) return;
    const spyIds = ["apropos", "competences", "experience", "formation", "distinctions", "service", "communications"];
    let current = "";
    function update() {
      let top = "";
      for (const id of spyIds) {
        const sec = document.getElementById(id);
        if (sec && sec.getBoundingClientRect().top <= 160) top = id;
      }
      current = top;
      links.forEach((a) => {
        a.classList.toggle("act", a.getAttribute("href") === "/#" + current);
      });
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  })();

  // ── horloge Cotonou ──
  const clockEls = Array.from(document.querySelectorAll("#cot-clock, #foot-clock"));
  function tickClock() {
    if (!clockEls.length) return;
    const loc = document.documentElement.lang === "en" ? "en-GB" : "fr-FR";
    let t;
    try {
      t = new Intl.DateTimeFormat(loc, {
        timeZone: "Africa/Porto-Novo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(new Date());
    } catch (err) {
      t = new Date().toLocaleTimeString(loc);
    }
    clockEls.forEach(function (el) { el.textContent = t; });
  }
  setInterval(tickClock, 1000);
  tickClock();

  // ── formulaire ──
  const form = document.getElementById("cform");
  if (form) {
    const nameI = document.getElementById("c-name");
    const emailI = document.getElementById("c-email");
    const msgI = document.getElementById("c-msg");
    const countEl = document.getElementById("c-count");
    const stateEl = document.getElementById("c-msgstate");

    if (msgI && countEl) {
      msgI.addEventListener("input", function () {
        countEl.textContent = this.value.length + " / 1000";
      });
    }

    [nameI, emailI, msgI].forEach(function (inp) {
      if (inp) {
        inp.addEventListener("input", function () {
          inp.closest(".field").classList.remove("bad");
        });
      }
    });

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      let ok = true;
      const fName = document.getElementById("f-name");
      const fEmail = document.getElementById("f-email");
      const fMsg = document.getElementById("f-msg");
      const badN = !nameI.value.trim();
      const badE = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailI.value.trim());
      const badM = msgI.value.trim().length < 20;
      fName.classList.toggle("bad", badN);
      fEmail.classList.toggle("bad", badE);
      fMsg.classList.toggle("bad", badM);
      ok = !(badN || badE || badM);
      stateEl.className = "form-msg show";
      if (!ok) {
        stateEl.classList.add("ko");
        stateEl.textContent = document.documentElement.lang === "en"
          ? "✕ Some fields require your attention before sending."
          : "✕ Certains champs nécessitent votre attention avant l'envoi.";
        return;
      }
      const params = new URLSearchParams();
      new FormData(form).forEach(function (v, k) { params.append(k, v); });
      params.append("form-name", form.getAttribute("name") || "contact");
      fetch(form.getAttribute("action") || "/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      })
        .then(function (res) {
          if (!res.ok) throw new Error("netlify");
          stateEl.className = "form-msg show ok";
          stateEl.textContent = document.documentElement.lang === "en"
            ? "✓ Message sent! Response within 48 business hours."
            : "✓ Message envoyé ! Réponse sous 48 h ouvrées.";
          form.reset();
          if (countEl) countEl.textContent = "0 / 1000";
        })
        .catch(function () {
          const email = document.querySelector("[data-contact-email]")?.getAttribute("data-contact-email") || "contact@idelphonseahogni.com";
          stateEl.className = "form-msg show ko";
          stateEl.textContent = document.documentElement.lang === "en"
            ? "✕ Sending failed. Please write directly to " + email + "."
            : "✕ L'envoi a échoué. Merci d'écrire directement à " + email + ".";
        });
    });
  }

  // ── Vercel Analytics custom events ──
  document.addEventListener("click", function (e) {
    var t = e.target;
    if (!(t instanceof HTMLElement)) return;
    // CV download
    if (t.id === "printBtn" || t.closest("#printBtn")) track("cv_download");
    // VCF download
    if (t.closest('a[href$=".vcf"]')) track("vcf_download");
    // BibTeX export
    if (t.id === "exportBibBtn" || t.closest("#exportBibBtn")) track("bibtex_export");
    // RIS export
    if (t.id === "exportRisBtn" || t.closest("#exportRisBtn")) track("ris_export");
    // Search open
    if (t.id === "searchTrigger" || t.closest("#searchTrigger")) track("search_open");
    // Language switch
    if (t.id === "langSwitch" || t.closest("#langSwitch")) track("lang_switch");
    // Dark mode toggle
    if (t.id === "themeToggle" || t.closest("#themeToggle")) track("theme_toggle");
    // External links
    var link = t.closest("a");
    if (link && link.hostname !== location.hostname) track("external_link", { url: link.href });
  });
})();
