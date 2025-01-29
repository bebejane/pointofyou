import { apiQuery } from "next-dato-utils/api";
import { AllNewsDocument, NewsDocument } from "@/graphql";
import { notFound } from "@node_modules/next/navigation";
import Article from "@/components/common/Article";
import { DraftMode } from "next-dato-utils/components";

export type NewsProps = {
	params: Promise<{ news: string }>;
};

export default async function NewsPage({ params }: NewsProps) {
	const { news: slug } = await params;
	const { news, draftUrl } = await apiQuery<NewsQuery, NewsQueryVariables>(NewsDocument, {
		variables: {
			slug,
		},
	});

	if (!news) return notFound();

	const { title, intro, image } = news;

	return (
		<>
			<Article
				title={title}
				image={image as FileField}
				intro={intro}
				link={{
					href: "/nyheter/aktuellt",
					text: "Visa alla nyheter",
				}}
			/>
			<DraftMode url={draftUrl} />
		</>
	);
}

export async function generateStaticParams() {
	const { allNews } = await apiQuery<AllNewsQuery, AllNewsQueryVariables>(AllNewsDocument, {
		all: true,
	});

	return allNews.map(({ slug }) => ({ slug }));
}
