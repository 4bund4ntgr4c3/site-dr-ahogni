import { sanityClient } from "sanity:client";
import { CONTENT_QUERY, cachedFetch } from "../../lib/queries";

export async function GET() {
  const content = await cachedFetch(sanityClient, CONTENT_QUERY);
  const pubs = content?.publications ?? [];

  const bibEntries = pubs.map((pub: any, i: number) => {
    const key = `ahogni${pub.year || 2024}_${String(pub.index || i + 1).padStart(2, "0")}`;
    const fields: string[] = [
      `  author = {${pub.authors || "Ahogni, I. B."}}`,
      `  title = {${pub.title || ""}}`,
      `  journal = {${pub.journal || ""}}`,
      `  year = {${pub.year || ""}}`,
    ];
    if (pub.doi) fields.push(`  doi = {${pub.doi}}`);
    if (pub.url) fields.push(`  url = {${pub.url}}`);

    return `@article{${key},\n${fields.join(",\n")}\n}`;
  }).join("\n\n");

  const header = `% Publications du Dr Idelphonse Bonaventure AHOGNI, PhD\n% Genere depuis https://idelphonseahogni.com/publications\n% Total: ${pubs.length} publications\n\n`;

  return new Response(header + bibEntries, {
    status: 200,
    headers: {
      "Content-Type": "application/x-bibtex; charset=utf-8",
      "Content-Disposition": 'attachment; filename="dr-ahogni-publications.bib"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}
