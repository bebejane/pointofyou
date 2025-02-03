import { apiQuery } from "next-dato-utils/api";
import { ResearchAboutDocument } from "@/graphql";
import { notFound } from "@node_modules/next/navigation";
import Article from "@/components/common/Article";
import { DraftMode } from "next-dato-utils/components";

export type ResearchAboutProps = {};

export default async function AboutResearchPage() {
	const { researchAbout, draftUrl } = await apiQuery<
		ResearchAboutQuery,
		ResearchAboutQueryVariables
	>(ResearchAboutDocument);

	if (!researchAbout) return notFound();

	const { title, intro, contentWrapper } = researchAbout;

	return (
		<>
			<Article
				title={title}
				intro={intro}
				content={contentWrapper.content}
				link={{
					href: "/nyheter/aktuellt",
					text: "Visa alla nyheter",
				}}
			/>
			<DraftMode url={draftUrl} />
		</>
	);
}
