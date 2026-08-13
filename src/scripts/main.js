import { inject as vercelAnalytics } from "@vercel/analytics";

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

  // ── bascule de langue FR/EN (texte d'interface) ──
  (function langSwitch() {
    const dict = {
      fr: { "a11y.skip": "Aller au contenu principal", "logo.title": "Dr Idelphonse B. AHOGNI", "logo.sub": "MSc, PhD, MPHc — Entomologiste en santé publique", "foot.loc": "Cotonou, Bénin", "foot.designed": "Conçu par", "foot.rights": "Tous droits réservés.", "foot.aria": "Liens du site", "cta.eyebrow": "Contact", "cta.title1": "Une mission, une consultation,", "cta.title2": "un <span class=\"it\" style=\"color:var(--amber2)\">partenariat ?</span>", "cta.desc": "Formulaire de prise de contact, disponibilités, coordonnées complètes et questions fréquentes vous attendent sur la page dédiée.", "cta.action": "Ouvrir la page contact ↗", "nav.home": "Accueil", "nav.profil": "Profil", "nav.expertises": "Expertises", "nav.parcours": "Parcours", "nav.formation": "Formation", "nav.service": "Service", "nav.publications": "Publications", "nav.blog": "Blog", "nav.speaking": "Conférences", "nav.distinctions": "Distinctions", "nav.changelog": "Changelog", "nav.contact": "Contact", "action.contact": "Me contacter", "action.back": "← Retour au site", "action.cv": "CV ↓ PDF", "lang.fr": "FR", "lang.en": "EN", "nw.eyebrow": "Newsletter", "nw.title1": "Lettre d'information", "nw.title2": "du terrain", "nw.desc": "Recherche, lutte antivectorielle et actualités du paludisme — un e-mail par mois, sans spam.", "nw.email": "Adresse e-mail", "nw.placeholder": "vous@exemple.org", "nw.cta": "S'abonner", "nw.aria": "Inscription à la newsletter", "hero.cta1": "Page contact ↗", "hero.cta2": "Explorer le parcours ↓", "hero.avail": "Disponible pour missions & consultations internationales", "sec.about.eyebrow": "01 — Profil", "sec.about.title": "<span class=\"ln\"><span>La science au service</span></span><span class=\"ln\"><span>des <span class=\"it\">programmes paludisme</span></span></span>", "sec.expertise.eyebrow": "02 — Expertises", "sec.expertise.title": "<span class=\"ln\"><span>Huit domaines</span></span><span class=\"ln\"><span>d'<span class=\"it\">intervention majeure</span></span></span>", "sec.career.eyebrow": "03 — Parcours", "sec.career.title": "<span class=\"ln\"><span>Une décennie à diriger</span></span><span class=\"ln\"><span>la <span class=\"it\">lutte antivectorielle</span></span></span>", "sec.career.desc": "Du laboratoire aux salles de décision ministérielles : un itinéraire construit entre recherche de pointe, gestion de projets multi-pays et appui direct aux programmes nationaux de lutte contre le paludisme.", "sec.education.eyebrow": "04 — Formation & Instrumentarium", "sec.education.title": "<span class=\"ln\"><span>Diplômes, méthodes</span></span><span class=\"ln\"><span>et <span class=\"it\">boîte à outils</span></span></span>", "sec.pubs.eyebrow": "05 — Publications", "sec.pubs.title": "<span class=\"ln\"><span>Travaux sélectionnés,</span></span><span class=\"ln\"><span><span class=\"it\">évalués par les pairs</span></span></span>", "sec.awards.eyebrow": "06 — Distinctions & Bourses", "sec.awards.title": "<span class=\"ln\"><span>Reconnaissances</span></span><span class=\"ln\"><span><span class=\"it\">internationales</span></span></span>", "sec.service.eyebrow": "07 — Service professionnel & Affiliations", "sec.service.title": "<span class=\"ln\"><span>Au service de la</span></span><span class=\"ln\"><span><span class=\"it\">communauté scientifique</span></span></span>", "sec.service.sub1": "Rôles consultatifs & techniques", "sec.service.sub2": "Affiliations & évaluation par les pairs", "sec.comms.eyebrow": "08 — Communications scientifiques (20+)", "sec.comms.title": "<span class=\"ln\"><span>Présentations &</span></span><span class=\"ln\"><span><span class=\"it\">conférences</span></span></span>", "sec.map.eyebrow": "09 — Pays d'intervention", "sec.map.title": "<span class=\"ln\"><span>Neuf pays, une</span></span><span class=\"ln\"><span>mission : <span class=\"it\">zéro paludisme</span></span></span>", "sec.map.intro": "Huit ans d'essais cliniques, de recherches de pointe et de programmes multi-pays à travers l'Afrique de l'Ouest, centrale, orientale et australe. Cliquez sur un marqueur de la carte ou sur un pays dans la liste pour afficher les projets et détails d'intervention.", "sec.map.panel.tag": "Pays d'intervention", "sec.map.panel.role": "Rôle & Mission", "sec.map.panel.focus": "Domaines d'action clés", "sec.map.panel.projects": "Programmes & Projets associés", "sec.map.btnPubs": "Voir les publications ↗", "sec.map.btnMission": "Proposer une mission", "sec.gallery.eyebrow": "10 — Galerie terrain", "sec.gallery.title": "<span class=\"ln\"><span>Sur le</span></span><span class=\"ln\"><span><span class=\"it\">terrain</span>, en laboratoire</span></span>", "sec.testimonials.eyebrow": "11 — Témoignages", "sec.testimonials.title": "<span class=\"ln\"><span>Ils m'ont fait</span></span><span class=\"ln\"><span><span class=\"it\">confiance</span></span></span>", "sec.projects.eyebrow": "Projets & programmes", "sec.projects.title": "<span class=\"ln\"><span>Programmes</span></span><span class=\"ln\"><span><span class=\"it\">financés</span> & missions</span></span>", "sec.projects.funder": "Financeur", "sec.projects.role": "Rôle", "sec.media.eyebrow": "Médiations & presse", "sec.media.title": "<span class=\"ln\"><span>Reprises</span></span><span class=\"ln\"><span>dans les <span class=\"it\">médias & podcasts</span></span></span>", "sec.media.play": "Écouter l'intervention" },
      en: { "a11y.skip": "Skip to main content", "logo.title": "Idelphonse B. AHOGNI, PhD", "logo.sub": "MSc, MPHc, Public Health Entomologist", "foot.loc": "Cotonou, Benin", "foot.designed": "Designed by", "foot.rights": "All rights reserved.", "foot.aria": "Site links", "cta.eyebrow": "Contact", "cta.title1": "A mission, a consultation,", "cta.title2": "a <span class=\"it\" style=\"color:var(--amber2)\">partnership?</span>", "cta.desc": "Contact form, availability, full details and frequently asked questions await you on the dedicated page.", "cta.action": "Open the contact page ↗", "nav.home": "Home", "nav.profil": "Profile", "nav.expertises": "Expertise", "nav.parcours": "Career", "nav.formation": "Education", "nav.service": "Service", "nav.publications": "Publications", "nav.blog": "Blog", "nav.speaking": "Speaking", "nav.distinctions": "Awards", "nav.changelog": "Changelog", "nav.contact": "Contact", "action.contact": "Contact me", "action.back": "← Back to site", "action.cv": "CV ↓ PDF", "lang.fr": "FR", "lang.en": "EN", "nw.eyebrow": "Newsletter", "nw.title1": "Field notes", "nw.title2": "newsletter", "nw.desc": "Research, vector control and malaria news — one monthly email, no spam.", "nw.email": "Email address", "nw.placeholder": "you@example.org", "nw.cta": "Subscribe", "nw.aria": "Subscribe to the newsletter", "hero.cta1": "Contact page ↗", "hero.cta2": "Explore career ↓", "hero.avail": "Available for international missions & consultations", "sec.about.eyebrow": "01 — Profile", "sec.about.title": "<span class=\"ln\"><span>Science in the service of</span></span><span class=\"ln\"><span>malaria <span class=\"it\">programs</span></span></span>", "sec.expertise.eyebrow": "02 — Expertise", "sec.expertise.title": "<span class=\"ln\"><span>Eight key</span></span><span class=\"ln\"><span><span class=\"it\">intervention</span> areas</span></span>", "sec.career.eyebrow": "03 — Career", "sec.career.title": "<span class=\"ln\"><span>A decade leading</span></span><span class=\"ln\"><span><span class=\"it\">vector control</span></span></span>", "sec.career.desc": "From the lab to ministerial decision rooms: a journey built between cutting-edge research, multi-country project management, and direct support to national malaria control programs.", "sec.education.eyebrow": "04 — Education & Toolkit", "sec.education.title": "<span class=\"ln\"><span>Degrees, methods</span></span><span class=\"ln\"><span>and <span class=\"it\">toolbox</span></span></span>", "sec.pubs.eyebrow": "05 — Publications", "sec.pubs.title": "<span class=\"ln\"><span>Selected peer-</span></span><span class=\"ln\"><span><span class=\"it\">reviewed</span> works</span></span>", "sec.awards.eyebrow": "06 — Awards & Fellowships", "sec.awards.title": "<span class=\"ln\"><span>International</span></span><span class=\"ln\"><span><span class=\"it\">recognition</span></span></span>", "sec.service.eyebrow": "07 — Professional Service & Affiliations", "sec.service.title": "<span class=\"ln\"><span>Serving the</span></span><span class=\"ln\"><span><span class=\"it\">scientific community</span></span></span>", "sec.service.sub1": "Consulting & technical roles", "sec.service.sub2": "Affiliations & peer review", "sec.comms.eyebrow": "08 — Scientific Communications (20+)", "sec.comms.title": "<span class=\"ln\"><span>Presentations &</span></span><span class=\"ln\"><span><span class=\"it\">conferences</span></span></span>", "sec.map.eyebrow": "09 — Countries of Intervention", "sec.map.title": "<span class=\"ln\"><span>Nine countries, one</span></span><span class=\"ln\"><span>mission: <span class=\"it\">zero malaria</span></span></span>", "sec.map.intro": "Eight years of clinical trials, cutting-edge research and multi-country programs across West, Central, East and Southern Africa. Click on a map marker or a country in the list to view projects and intervention details.", "sec.map.panel.tag": "Country of intervention", "sec.map.panel.role": "Role & Mission", "sec.map.panel.focus": "Key focus areas", "sec.map.panel.projects": "Programs & Projects", "sec.map.btnPubs": "View publications ↗", "sec.map.btnMission": "Propose a mission", "sec.gallery.eyebrow": "10 — Field Gallery", "sec.gallery.title": "<span class=\"ln\"><span>In the</span></span><span class=\"ln\"><span><span class=\"it\">field</span>, in the lab</span></span>", "sec.testimonials.eyebrow": "11 — Testimonials", "sec.testimonials.title": "<span class=\"ln\"><span>They trusted</span></span><span class=\"ln\"><span><span class=\"it\">me</span></span></span>", "sec.projects.eyebrow": "Projects & Programs", "sec.projects.title": "<span class=\"ln\"><span>Funded</span></span><span class=\"ln\"><span><span class=\"it\">programs</span> & missions</span></span>", "sec.projects.funder": "Funder", "sec.projects.role": "Role", "sec.media.eyebrow": "Media & Press", "sec.media.title": "<span class=\"ln\"><span>Featured in</span></span><span class=\"ln\"><span><span class=\"it\">media & podcasts</span></span></span>", "sec.media.play": "Listen to the interview" },
    };
    function apply(lang) {
      document.documentElement.lang = lang;
      document.querySelectorAll("[data-i18n]").forEach(function (el) {
        const v = dict[lang] && dict[lang][el.getAttribute("data-i18n")];
        if (v !== undefined) el.textContent = v;
      });
      document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
        const v = dict[lang] && dict[lang][el.getAttribute("data-i18n-html")];
        if (v !== undefined) el.innerHTML = v;
      });
      document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
        const v = dict[lang] && dict[lang][el.getAttribute("data-i18n-aria")];
        if (v !== undefined) el.setAttribute("aria-label", v);
      });
      document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
        const v = dict[lang] && dict[lang][el.getAttribute("data-i18n-placeholder")];
        if (v !== undefined) el.setAttribute("placeholder", v);
      });
      document.querySelectorAll(".lang-opt").forEach(function (o) {
        o.classList.toggle("active", o.getAttribute("data-lang") === lang);
      });
    }
const switchers = Array.from(document.querySelectorAll("#langSwitch, #langSwitchPanel"));
if (switchers.length) {
  switchers.forEach(function (sw) {
    sw.addEventListener("click", function () {
      const next = document.documentElement.lang === "fr" ? "en" : "fr";
      apply(next);
      try { localStorage.setItem("lang", next); } catch (e) {}
    });
  });
  let saved = "fr";
  try { saved = localStorage.getItem("lang") || "fr"; } catch (e) {}
  apply(saved);
}
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
        btn.title = current() === "dark" ? "Passer en mode clair" : "Passer en mode sombre";
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
    let t;
    try {
      t = new Intl.DateTimeFormat("fr-FR", {
        timeZone: "Africa/Porto-Novo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(new Date());
    } catch (err) {
      t = new Date().toLocaleTimeString("fr-FR");
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
        stateEl.textContent = "✕ Certains champs nécessitent votre attention avant l'envoi.";
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
          stateEl.textContent = "✓ Message envoyé ! Réponse sous 48 h ouvrées.";
          form.reset();
          if (countEl) countEl.textContent = "0 / 1000";
        })
        .catch(function () {
          const email = document.querySelector("[data-contact-email]")?.getAttribute("data-contact-email") || "contact@idelphonseahogni.com";
          stateEl.className = "form-msg show ko";
          stateEl.textContent = "✕ L'envoi a échoué. Merci d'écrire directement à " + email + ".";
        });
    });
  }
})();
