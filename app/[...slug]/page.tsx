import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DetailPage from '@/components/DetailPage';
import { getPage, pages } from '@/lib/content';

type Params = { slug: string[] };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return pages.map((p) => ({ slug: p.path.split('/').filter(Boolean) }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage('/' + slug.join('/'));
  if (!page) return {};
  return {
    title: page.crumb,
    description: page.intro,
    alternates: { canonical: page.path },
    openGraph: { title: `${page.crumb} · OAGITECH`, description: page.intro, images: [page.img] }
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = getPage('/' + slug.join('/'));
  if (!page) notFound();
  return <DetailPage page={page} />;
}
