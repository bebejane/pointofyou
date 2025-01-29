import { apiQuery } from "next-dato-utils/api";
import { AboutDocument } from "@/graphql";
import { notFound } from "@node_modules/next/navigation";
import Article from "@/components/common/Article";
import { DraftMode } from "next-dato-utils/components";

export type AboutProps = {
	params: Promise<{ about: string }>;
};

export default async function AboutPage({ params }: AboutProps) {
	const { about: slug } = await params;
	const { about, draftUrl } = await apiQuery<AboutQuery, AboutQueryVariables>(AboutDocument, {
		variables: {
			slug,
		},
	});

	if (!about) return notFound();

	const { title, intro, image, contentWrapper } = about;

	return (
		<>
			<Article
				title={title}
				image={image as FileField}
				intro={intro}
				content={contentWrapper.content}
			/>
			<DraftMode url={draftUrl} />
		</>
	);
}
