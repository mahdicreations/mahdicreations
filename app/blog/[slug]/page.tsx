import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogArticles, getArticleBySlug } from "../data";
import { ArticleContent } from "./ArticleContent";

export function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Article introuvable" };
  }

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: [article.keyword, "Mahdi Créations", "agence web Marrakech", "Maroc"],
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: "article",
      locale: "fr_MA",
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <ArticleContent slug={slug} />;
}
