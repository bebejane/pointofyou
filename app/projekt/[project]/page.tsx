import { apiQuery } from "next-dato-utils/api";
import { ProjectDocument } from "@/graphql";
import { notFound } from "@node_modules/next/navigation";
import Article from "@/components/common/Article";

export type ProjectProps = {
	params: Promise<{ project: string }>;
};

export default async function Page({ params }: ProjectProps) {
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
	);
}
