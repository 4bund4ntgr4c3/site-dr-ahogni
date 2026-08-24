/** Helper i18n centralisé — DRY pour isEn / pfx / lang via URL */
export function getLangFromUrl(url: URL | string): { isEn: boolean; lang: "fr" | "en"; pfx: string } {
  const pathname = typeof url === "string" ? url : url.pathname;
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  return { isEn, lang: isEn ? "en" : "fr", pfx: isEn ? "/en" : "" };
}

export function stripEnPrefix(pathname: string): string {
  return pathname.replace(/^\/en(\/|$)/, "/") || "/";
}

export function toEnPath(pathname: string): string {
  const stripped = stripEnPrefix(pathname);
  return stripped === "/" ? "/en" : "/en" + stripped;
}

export function toFrPath(pathname: string): string {
  return stripEnPrefix(pathname);
}
