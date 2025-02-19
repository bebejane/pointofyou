import { apiQuery } from 'next-dato-utils/api';
import { AllNewsDocument, NewsDocument, PressDocument } from '@/graphql';
import { notFound } from '@node_modules/next/navigation';
import Article from '@/components/common/Article';
import { DraftMode } from 'next-dato-utils/components';
import { Metadata } from 'next';

export type NewsProps = {
	params: Promise<{ category: 'aktuellt' | 'press'; slug: string }>;
};

export default async function NewsPage({ params }: NewsProps) {
	const { slug, category } = await params;
	const { post, draftUrl } = await getPost(category, slug);
	if (!post) return notFound();

	const { title, intro, image, contentWrapper } = post;

	return (
		<>
			<Article
				title={title}
				image={image as FileField}
				intro={intro}
				content={contentWrapper.content}
				light={contentWrapper.headerLight}
				link={{
					href: `/nyheter/${category}`,
					text: `Visa alla ${category}`,
				}}
			/>
			<DraftMode url={draftUrl} path={`/nyheter/${category}/${slug}`} />
		</>
	);
}

export async function getPost(
	category: 'aktuellt' | 'press',
	slug: string
): Promise<{ post: NewsQuery['news'] | PressQuery['press']; draftUrl: string }> {
	if (category === 'aktuellt') {
		const { news, draftUrl } = await apiQuery<NewsQuery, NewsQueryVariables>(NewsDocument, {
			variables: {
				slug,
			},
		});
		return { post: news, draftUrl };
	} else {
		const { press, draftUrl } = await apiQuery<PressQuery, PressQueryVariables>(PressDocument, {
			variables: {
				slug,
			},
		});

		return { post: press, draftUrl };
	}
}

export async function generateStaticParams() {
	const { allNews, allPresses } = await apiQuery<AllNewsQuery, AllNewsQueryVariables>(
		AllNewsDocument,
		{
			all: true,
		}
	);

	return allNews.concat(allPresses as any[]).map(({ slug, __typename }) => ({
		category: __typename === 'NewsRecord' ? 'aktuellt' : 'press',
		slug,
	}));
}

export async function generateMetadata({ params }) {
	const { slug, category } = await params;
	const { post } = await getPost(category, slug);
	console.log(category, slug);
	return {
		title: post?.title,
	} as Metadata;
}
