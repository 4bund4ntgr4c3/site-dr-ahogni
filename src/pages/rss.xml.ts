import rss from "@astrojs/rss";
import { sanityClient } from "sanity:client";
import { POSTS_QUERY, cachedFetch } from "../lib/queries";

export async function GET(context: { site: URL }) {
  const posts = await cachedFetch(sanityClient, POSTS_QUERY);

  return rss({
    title: "Dr I. B. Ahogni — Blog & Notes de terrain",
    description: "Chroniques de terrain, enseignement et actualités de la lutte antivectorielle et de la recherche sur le paludisme.",
    site: context.site,
    items: (posts ?? []).map((post: any) => ({
      title: post.title,
      pubDate: new Date(post.publishedAt),
      description: post.excerpt || "",
      link: `/blog/${post.slug?.current}/`,
    })),
    customData: "<language>fr</language>",
  });
}
