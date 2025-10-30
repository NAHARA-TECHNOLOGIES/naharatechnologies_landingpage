// types/post.ts
export interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content?: string;
  author: string;
  publishedAt: string;
  image?: string;
  tags?: string[];      // ✅ optional tags
  views?: number;
}

// Mock posts
export const relatedPosts: Post[] = [
  {
    id: "1",
    title: "The Rise of AI in Everyday Life",
    slug: "ai-everyday-life",
    category: "Technology",
    tags: ["AI", "Innovation"],
    excerpt: "Discover how artificial intelligence is shaping our daily routines...",
    content: "<p>Full content here...</p>",
    author: "Jane Doe",
    publishedAt: "2025-10-20T10:00:00Z",
    image: "/posts/tech.jpg",
    views: 1200,
  },
  {
    id: "2",
    title: "Top Fitness Trends in 2025",
    slug: "fitness-trends-2025",
    category: "Health",
    tags: ["Fitness", "Wellness"],
    excerpt: "Explore the hottest fitness trends that will dominate 2025...",
    content: "<p>Full content here...</p>",
    author: "John Smith",
    publishedAt: "2025-10-18T08:00:00Z",
    image: "/posts/fitness.jpg",
    views: 950,
  },
  {
    id: "3",
    title: "Champions League Highlights",
    slug: "champions-league-highlights",
    category: "Sports",
    tags: ["Football", "Soccer"],
    excerpt: "A summary of all the amazing Champions League matches...",
    content: "<p>Full content here...</p>",
    author: "Mike Johnson",
    publishedAt: "2025-10-19T14:30:00Z",
    image: "/posts/football.jpg",
    views: 800,
  },
];

// Get single post
export const getPost = async (slug: string): Promise<Post | null> => {
  const post = relatedPosts.find((p) => p.slug === slug);
  return post || null;
};

// Get related posts by category (exclude current post)
export const getRelatedPosts = async (
  category: string,
  excludeSlug?: string,
  limit = 3
): Promise<Post[]> => {
  const filtered = relatedPosts
    .filter((p) => p.category === category && p.slug !== excludeSlug)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return filtered.slice(0, limit);
};

// Get posts by tag
export const getPostsByTag = async (tag: string, limit = 5): Promise<Post[]> => {
  return relatedPosts
    .filter((p) => p.tags?.includes(tag))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
};

export const getReadingTime = (content?: string) => {
  if (!content) return 1; // fallback 1 min
  const words = content.replace(/<[^>]+>/g, "").split(/\s+/).length;
  return Math.ceil(words / 200); // average 200 words per min
};
