import { Manga } from "../types/manga";

const BASE_URL = "https://api.mangadex.org";
const COVER_BASE_URL = "https://uploads.mangadex.org/covers";

/**
 * Builds a full cover image URL from a manga id + cover filename.
 * MangaDex serves covers separately from manga metadata.
 */
function buildCoverUrl(mangaId: string, fileName: string, size: 256 | 512 = 512) {
  return `${COVER_BASE_URL}/${mangaId}/${fileName}.${size}.jpg`;
}

function mapMangaResponse(item: any): Manga {
  const attributes = item.attributes ?? {};
  const title =
    attributes.title?.en ??
    Object.values(attributes.title ?? {})[0] ??
    "Untitled";

  const coverRel = item.relationships?.find(
    (rel: any) => rel.type === "cover_art"
  );
  const fileName = coverRel?.attributes?.fileName;
  const coverUrl = fileName ? buildCoverUrl(item.id, fileName) : "";

  const genres: string[] = (attributes.tags ?? [])
    .filter((t: any) => t.attributes?.group === "genre")
    .map((t: any) => t.attributes?.name?.en)
    .filter(Boolean);

  return {
    id: item.id,
    title,
    coverUrl,
    status: attributes.status,
    genres,
    description: attributes.description?.en,
  };
}

/**
 * Fetches a list of manga, optionally filtered by genre tag id or sorted
 * by a given order (e.g. "rating", "followedCount", "latestUploadedChapter").
 */
export async function fetchMangaList(params: {
  limit?: number;
  offset?: number;
  order?: Record<string, "asc" | "desc">;
  includedTags?: string[];
  title?: string;
} = {}): Promise<Manga[]> {
  const searchParams = new URLSearchParams();
  searchParams.set("limit", String(params.limit ?? 20));
  searchParams.set("offset", String(params.offset ?? 0));
  searchParams.append("includes[]", "cover_art");
  searchParams.append("contentRating[]", "safe");
  searchParams.append("contentRating[]", "suggestive");

  if (params.title) searchParams.set("title", params.title);

  if (params.order) {
    for (const [key, dir] of Object.entries(params.order)) {
      searchParams.set(`order[${key}]`, dir);
    }
  }

  if (params.includedTags) {
    for (const tagId of params.includedTags) {
      searchParams.append("includedTags[]", tagId);
    }
  }

  const res = await fetch(`${BASE_URL}/manga?${searchParams.toString()}`);
  if (!res.ok) throw new Error(`MangaDex request failed: ${res.status}`);
  const json = await res.json();
  return (json.data ?? []).map(mapMangaResponse);
}

/** Fetches trending manga, sorted by follower count. */
export function fetchTrendingManga(limit = 10) {
  return fetchMangaList({ limit, order: { followedCount: "desc" } });
}

/** Fetches the most recently updated manga (new chapters). */
export function fetchNewReleases(limit = 10) {
  return fetchMangaList({ limit, order: { latestUploadedChapter: "desc" } });
}

/** Fetches all available genre tags from MangaDex. */
export async function fetchGenres(): Promise<{ id: string; name: string }[]> {
  const res = await fetch(`${BASE_URL}/manga/tag`);
  if (!res.ok) throw new Error(`MangaDex request failed: ${res.status}`);
  const json = await res.json();
  return (json.data ?? [])
    .filter((t: any) => t.attributes?.group === "genre")
    .map((t: any) => ({ id: t.id, name: t.attributes?.name?.en }));
}

/** Searches manga by title. */
export function searchManga(query: string, limit = 20) {
  return fetchMangaList({ title: query, limit });
}
