import { apiQuery } from "next-dato-utils/api";
import { AllEducationsDocument, EducationDocument } from "@/graphql";
import { notFound } from "@node_modules/next/navigation";
import Article from "@/components/common/Article";
import { DraftMode } from "next-dato-utils/components";

export type EducationProps = {
	params: Promise<{ education: string }>;
};

export default async function EducationPage({ params }: EducationProps) {
	const { education: slug } = await params;
	const { education, draftUrl } = await apiQuery<EducationQuery, EducationQueryVariables>(
		EducationDocument,
		{
			variables: {
				slug,
			},
		}
	);

	if (!education) return notFound();

	const { title, intro, contentWrapper } = education;

	return (
		<>
			<Article
				title={title}
				intro={intro}
				content={contentWrapper.content}
			/>
			<DraftMode url={draftUrl} />
		</>
	);
}

export async function generateStaticParams() {
	const { allEducations } = await apiQuery<AllEducationsQuery, AllEducationsQueryVariables>(
		AllEducationsDocument,
		{
			all: true,
		}
	);

	return allEducations.map(({ slug }) => ({ slug }));
}
