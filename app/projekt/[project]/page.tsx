import { apiQuery } from 'next-dato-utils/api';
import { AllProjectsDocument, ProjectDocument } from '@/graphql';
import { notFound } from 'next/navigation';
import Article from '@/components/common/Article';
import { DraftMode } from 'next-dato-utils/components';
import { Metadata } from 'next';

export type ProjectProps = {
	params: Promise<{ project: string }>;
};

export default async function ProjectPage({ params }: ProjectProps) {
	const { project: slug } = await params;
	const { project, draftUrl } = await apiQuery(ProjectDocument, {
		variables: {
			slug,
		},
	});

	if (!project) return notFound();

	const { title, intro, image, contentWrapper } = project;

	return (
		<>
			<Article
				title={title}
				image={image as FileField}
				intro={intro}
				content={contentWrapper.content}
				light={contentWrapper.headerLight}
				link={{
					href: '/projekt',
					text: 'Visa alla projekt',
				}}
			/>
			<DraftMode url={draftUrl} path={`/projekt/${slug}`} />
		</>
	);
}

export async function generateStaticParams() {
	const { allProjects } = await apiQuery(AllProjectsDocument, {
		all: true,
	});

	return allProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
	const { project: slug } = await params;
	const { project } = await apiQuery(ProjectDocument, {
		variables: {
			slug,
		},
	});

	return {
		title: project.title,
	} as Metadata;
}
