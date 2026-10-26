import type { SbRichTextDoc } from "@storyblok/js";

/** Fields every block from Storyblok has. */
export type Blok = {
  _uid: string;
  component: string;
  _editable?: string;
};

/** An `asset` field. */
export type Asset = {
  filename: string | null;
  alt?: string | null;
};

/** A `multilink` field. */
export type Link = {
  linktype?: "url" | "story" | "email" | "asset";
  url?: string;
  cached_url?: string;
  email?: string;
  anchor?: string;
};

/** A `richtext` field. */
export type RichText = SbRichTextDoc | null | undefined;

/** Resizes Storyblok images with the Image Service, keeping the aspect ratio. */
export function imageUrl(asset: Asset | undefined, width: number): string | undefined {
  if (!asset?.filename) {
    return undefined;
  }
  return asset.filename.includes("a.storyblok.com")
    ? `${asset.filename}/m/${width}x0/filters:quality(80)`
    : asset.filename;
}

/**
 * The alt text of an asset. An empty alt text in Storyblok renders no `alt` attribute, so the
 * accessibility checker reports the image instead of treating it as decorative.
 */
export function altText(asset: Asset | undefined): string | undefined {
  return asset?.alt || undefined;
}

export function linkUrl(link: Link | undefined): string | undefined {
  if (!link) {
    return undefined;
  }
  const anchor = link.anchor ? `#${link.anchor}` : "";
  if (link.linktype === "email") {
    return link.email ? `mailto:${link.email}` : undefined;
  }
  if (link.linktype === "story") {
    if (!link.cached_url) {
      return anchor || undefined;
    }
    const path = link.cached_url.replace(/^\/|\/$/g, "");
    return `/${path === "home" ? "" : path}${anchor}`;
  }
  const url = link.url || link.cached_url;
  return url ? `${url}${anchor}` : undefined;
}

/** Formats a `datetime` field, such as "2026-10-26 10:00". */
export function formatDate(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }
  const date = new Date(value.replace(" ", "T"));
  return Number.isNaN(date.getTime())
    ? undefined
    : new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(date);
}
