import { apiQuery } from "next-dato-utils/api";
import { AllProjectsDocument, ProjectDocument } from "@/graphql";
import { notFound } from "@node_modules/next/navigation";
import Article from "@/components/common/Article";
import { DraftMode } from "next-dato-utils/components";

export type ProjectProps = {
	params: Promise<{ project: string }>;
};

export default async function ProjectPage({ params }: ProjectProps) {
	const { project: slug } = await params;
	const { project, draftUrl } = await apiQuery<ProjectQuery, ProjectQueryVariables>(
		ProjectDocument,
		{
			variables: {
				slug,
			},
		}
	);

	if (!project) return notFound();

	const { title, intro, image, contentWrapper } = project;

	return (
		<>
			<Article
				title={title}
				image={image as FileField}
				intro={intro}
				content={contentWrapper.content}
				link={{
					href: "/projekt",
					text: "Visa alla projekt",
				}}
			/>
			<DraftMode url={draftUrl} />
		</>
	);
}

export async function generateStaticParams() {
	const { allProjects } = await apiQuery<AllProjectsQuery, AllProjectsQueryVariables>(
		AllProjectsDocument,
		{
			all: true,
		}
	);

	return allProjects.map(({ slug }) => ({ slug }));
}
