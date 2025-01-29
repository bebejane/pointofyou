import { apiQuery } from "next-dato-utils/api";
import { EnglishDocument } from "@/graphql";
import { DraftMode } from "next-dato-utils/components";
import { notFound } from "@node_modules/next/navigation";
import Article from "@/components/common/Article";

export default async function EnglishPage({ searchParams }) {
	const { english, draftUrl } = await apiQuery<EnglishQuery, EnglishQueryVariables>(
		EnglishDocument
	);

	if (!english) return notFound();
	const { title, contentWrapper, intro } = english;

	return (
		<>
			<Article
				title={title}
				content={contentWrapper.content}
				intro={intro}
			/>
			<DraftMode url={draftUrl} />
		</>
	);
}
