import fr from "../../i18n/fr.json";
import en from "../../i18n/en.json";

export const dict: Record<string, Record<string, string>> = {
  fr,
  en,
} as const;

export function applyLang(lang: string): void {
  const d = dict[lang];
  if (!d) return;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const v = key ? d[key] : undefined;
    if (v !== undefined) {
      if (v.indexOf("<") !== -1 && v.indexOf(">") !== -1) {
        el.innerHTML = v;
      } else {
        el.textContent = v;
      }
    }
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    const v = key ? d[key] : undefined;
    if (v !== undefined) el.innerHTML = v;
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    const v = key ? d[key] : undefined;
    if (v !== undefined) el.setAttribute("aria-label", v);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    const v = key ? d[key] : undefined;
    if (v !== undefined) el.setAttribute("placeholder", v);
  });
  document.querySelectorAll(".lang-opt").forEach((o) => {
    o.classList.toggle("active", o.getAttribute("data-lang") === lang);
  });
}

export function navigateToLang(targetLang?: string | null): void {
  const currentPath = window.location.pathname;
  const currentSearch = window.location.search;
  const currentHash = window.location.hash;
  const isCurrentlyEn =
    currentPath === "/en" || currentPath.startsWith("/en/");

  let resolvedLang: string | null | undefined = targetLang;
  if (
    !resolvedLang ||
    (resolvedLang === "en" && isCurrentlyEn) ||
    (resolvedLang === "fr" && !isCurrentlyEn)
  ) {
    resolvedLang = isCurrentlyEn ? "fr" : "en";
  }

  let targetPath = "";
  if (resolvedLang === "en") {
    const cleanPath =
      currentPath === "/" ? "" : currentPath.replace(/\/$/, "");
    targetPath = `/en${cleanPath}` || "/en";
  } else {
    targetPath = currentPath.replace(/^\/en(\/|$)/, "/") || "/";
    if (!targetPath.startsWith("/")) targetPath = "/" + targetPath;
  }

  try {
    localStorage.setItem("lang", resolvedLang as string);
  } catch {}
  window.location.href = targetPath + currentSearch + currentHash;
}

export function initI18n(): void {
  const isEnUrl =
    window.location.pathname === "/en" ||
    window.location.pathname.startsWith("/en/");
  const initialLang = isEnUrl ? "en" : "fr";
  applyLang(initialLang);
  try {
    localStorage.setItem("lang", initialLang);
  } catch {}
  document
    .querySelectorAll(".lang-switch, #langSwitch, #langSwitchPanel")
    .forEach((sw) => {
      sw.addEventListener("click", (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        const target = e.target as HTMLElement | null;
        const opt =
          target && (target as HTMLElement).closest
            ? (target as HTMLElement).closest(".lang-opt, [data-lang]")
            : null;
        const chosenLang = opt
          ? opt.getAttribute("data-lang")
          : null;
        navigateToLang(chosenLang);
      });
    });
}
