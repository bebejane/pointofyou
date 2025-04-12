import { MetadataRoute } from 'next'
import { apiQuery } from 'next-dato-utils/api'
import { SitemapDocument } from '@/graphql'

const routes = ['/', '/english', '/kontakt', '/nyheter', '/nyheter/aktuellt', '/nyheter/press', '/projekt']

const staticRoutes = [
  ...routes.map((route) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  }))
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const { allAbouts, allEducations, allProjects, allNews, allPresses } = await apiQuery<SitemapQuery, SitemapQueryVariables>(
    SitemapDocument,
    {
      variables: {
        first: 100,
        skip: 0,
      },
      all: true,
    }
  )

  const abouts = allAbouts.map(({ slug, _publishedAt }) => ({ url: `${process.env.NEXT_PUBLIC_SITE_URL}/om/${slug}`, lastModified: new Date(_publishedAt), changeFrequency: 'monthly', priority: 0.9 }))
  const educations = allEducations.map(({ slug, _publishedAt }) => ({ url: `${process.env.NEXT_PUBLIC_SITE_URL}/utbildning/${slug}`, lastModified: new Date(_publishedAt), changeFrequency: 'monthly', priority: 0.9 }))
  const projects = allProjects.map(({ slug, _publishedAt }) => ({ url: `${process.env.NEXT_PUBLIC_SITE_URL}/projekt/${slug}`, lastModified: new Date(_publishedAt), changeFrequency: 'weekly', priority: 0.9 }))
  const news = allNews.map(({ slug, _publishedAt }) => ({ url: `${process.env.NEXT_PUBLIC_SITE_URL}/nyheter/aktuellt/${slug}`, lastModified: new Date(_publishedAt), changeFrequency: 'daily', priority: 0.9 }))
  const press = allPresses.map(({ slug, _publishedAt }) => ({ url: `${process.env.NEXT_PUBLIC_SITE_URL}/nyheter/press/${slug}`, lastModified: new Date(_publishedAt), changeFrequency: 'weekly', priority: 0.9 }))
  const sitemap = [
    ...staticRoutes,
    ...abouts,
    ...educations,
    ...projects,
    ...news,
    ...press
  ]

  return sitemap as MetadataRoute.Sitemap
}
