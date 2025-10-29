import { apiQuery } from 'next-dato-utils/api';
import { SitemapDocument } from '@/graphql';
import { DatoCmsConfig, getUploadReferenceRoutes, getItemReferenceRoutes } from 'next-dato-utils/config';
import { MetadataRoute } from 'next';

export default {
	routes: {
		home: async () => ['/'],
		about: async ({ slug }) => [`/om/${slug}`],
		education: async ({ slug }) => [`/utbildning/${slug}`],
		project: async ({ slug }) => [`/projekt/${slug}`],
		research: async () => ['/forskning/kunskapsbank'],
		research_about: async () => ['/forskning/om'],
		research_category: async ({ id }) => ['/forskning/kunskapsbank', ...(await getItemReferenceRoutes(id))],
		press: async ({ slug }) => [`/nyheter/press/${slug}`],
		news: async ({ slug }) => [`/nyheter/aktuellt/${slug}`],
		contact: async () => ['/kontakt'],
		english: async () => ['/english'],
		sound: async () => ['/'],
		support: async () => ['/'],
		presskit: async () => ['/nyheter/press'],
		internal_link: async ({ id }) => [...(await getItemReferenceRoutes(id))],
		external_link: async ({ id }) => [...(await getItemReferenceRoutes(id))],
		upload: async (record, locale) => getUploadReferenceRoutes(record),
	},
	sitemap: async () => {
		const { allAbouts, allEducations, allProjects, allNews, allPresses } = await apiQuery(SitemapDocument, {
			all: true,
		});

		const abouts = allAbouts.map(({ slug, _publishedAt }) => ({
			url: `${process.env.NEXT_PUBLIC_SITE_URL}/om/${slug}`,
			lastModified: new Date(_publishedAt),
			changeFrequency: 'monthly',
			priority: 0.9,
		}));
		const educations = allEducations.map(({ slug, _publishedAt }) => ({
			url: `${process.env.NEXT_PUBLIC_SITE_URL}/utbildning/${slug}`,
			lastModified: new Date(_publishedAt),
			changeFrequency: 'monthly',
			priority: 0.9,
		}));
		const projects = allProjects.map(({ slug, _publishedAt }) => ({
			url: `${process.env.NEXT_PUBLIC_SITE_URL}/projekt/${slug}`,
			lastModified: new Date(_publishedAt),
			changeFrequency: 'weekly',
			priority: 0.9,
		}));
		const news = allNews.map(({ slug, _publishedAt }) => ({
			url: `${process.env.NEXT_PUBLIC_SITE_URL}/nyheter/aktuellt/${slug}`,
			lastModified: new Date(_publishedAt),
			changeFrequency: 'daily',
			priority: 0.9,
		}));
		const press = allPresses.map(({ slug, _publishedAt }) => ({
			url: `${process.env.NEXT_PUBLIC_SITE_URL}/nyheter/press/${slug}`,
			lastModified: new Date(_publishedAt),
			changeFrequency: 'weekly',
			priority: 0.9,
		}));

		const staticRoutes = [
			'/',
			'/english',
			'/kontakt',
			'/nyheter',
			'/nyheter/aktuellt',
			'/nyheter/press',
			'/projekt',
		].map((route) => ({
			url: `${process.env.NEXT_PUBLIC_SITE_URL}${route}`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		}));
		return [...staticRoutes, ...abouts, ...educations, ...projects, ...news, ...press] as MetadataRoute.Sitemap;
	},
	manifest: async () => {
		return {
			name: 'Point of You',
			short_name: 'Point of You',
			description: 'Point of You website',
			start_url: '/',
			display: 'standalone',
			background_color: '#ffffff',
			theme_color: '#f6f3ee',
			icons: [
				{
					src: '/favicon.ico',
					sizes: 'any',
					type: 'image/x-icon',
				},
			],
		} satisfies MetadataRoute.Manifest;
	},
	robots: async () => {
		return {
			rules: {
				userAgent: '*',
				allow: '/',
			},
		};
	},
} satisfies DatoCmsConfig;
