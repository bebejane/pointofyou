import { apiQuery } from 'next-dato-utils/api';
import { AllEducationsDocument, EducationDocument } from '@/graphql';
import { notFound } from 'next/navigation';
import Article from '@/components/common/Article';
import { DraftMode } from 'next-dato-utils/components';
import { Metadata } from 'next';

export type EducationProps = {
	params: Promise<{ education: string }>;
};

export default async function EducationPage({ params }: EducationProps) {
	const { education: slug } = await params;
	const { education, draftUrl } = await apiQuery(EducationDocument, {
		variables: {
			slug,
		},
	});

	if (!education) return notFound();

	const { title, intro, image, contentWrapper } = education;

	return (
		<>
			<Article
				title={title}
				intro={intro}
				image={image as FileField}
				content={contentWrapper.content}
				light={contentWrapper.headerLight}
			/>
			<DraftMode url={draftUrl} path={`/utbildning/${slug}`} />
		</>
	);
}

export async function generateStaticParams() {
	const { allEducations } = await apiQuery(AllEducationsDocument, {
		all: true,
	});

	return allEducations.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
	const { education: slug } = await params;
	const { education, draftUrl } = await apiQuery(EducationDocument, {
		variables: {
			slug,
		},
	});

	return {
		title: education.title,
	} as Metadata;
}
