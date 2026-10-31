import type { MetadataRoute } from 'next';
import { pages } from '@/lib/content';

const BASE = 'https://oagitech.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const fixed = ['/', '/ndt', '/training', '/contact', '/verify'];
  return [...fixed, ...pages.map((p) => p.path)].map((path) => ({
    url: BASE + path,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : path.split('/').length > 2 ? 0.6 : 0.8
  }));
}
