import { apiQuery } from 'next-dato-utils/api';
import { AllNewsDocument, NewsDocument, PressDocument } from '@/graphql';
import { notFound } from '@node_modules/next/navigation';
import Article from '@/components/common/Article';
import { DraftMode } from 'next-dato-utils/components';

export type NewsProps = {
	params: Promise<{ category: 'aktuellt' | 'press'; slug: string }>;
};

export default async function NewsPage({ params }: NewsProps) {
	const { slug, category } = await params;
	let post: NewsQuery['news'] | PressQuery['press'];
	let url: string;

	if (category === 'aktuellt') {
		let { news, draftUrl } = await apiQuery<NewsQuery, NewsQueryVariables>(NewsDocument, {
			variables: {
				slug,
			},
		});
		post = news;
		url = draftUrl;
	} else {
		let { press, draftUrl } = await apiQuery<PressQuery, PressQueryVariables>(PressDocument, {
			variables: {
				slug,
			},
		});
		post = press;
		url = draftUrl;
	}

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
			<DraftMode url={url} path={`/nyheter/${category}/${slug}`} />
		</>
	);
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
