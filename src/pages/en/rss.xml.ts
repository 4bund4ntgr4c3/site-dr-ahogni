import rss from "@astrojs/rss";
import { sanityClient } from "sanity:client";
import { POSTS_QUERY, cachedFetch } from "../../lib/queries";

export async function GET(context: { site: URL }) {
  const posts = await cachedFetch(sanityClient, POSTS_QUERY);

  return rss({
    title: "Dr I. B. Ahogni, PhD — Field Notes & Malaria Research",
    description: "Field chronicles, scientific lectures, and updates on vector control and malaria research in Africa.",
    site: context.site,
    items: (posts ?? []).map((post: any) => ({
      title: post.title,
      pubDate: new Date(post.publishedAt),
      description: post.excerpt || "",
      link: `/en/blog/${post.slug?.current}/`,
    })),
    customData: "<language>en</language>",
  });
}
