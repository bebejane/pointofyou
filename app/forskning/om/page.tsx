import { apiQuery } from 'next-dato-utils/api';
import { ResearchAboutDocument } from '@/graphql';
import { notFound } from 'next/navigation';
import Article from '@/components/common/Article';
import { DraftMode } from 'next-dato-utils/components';
import { Metadata } from 'next';

export type ResearchAboutProps = {};

export default async function AboutResearchPage() {
	const { researchAbout, draftUrl } = await apiQuery(ResearchAboutDocument);

	if (!researchAbout) return notFound();

	const { title, intro, contentWrapper } = researchAbout;

	return (
		<>
			<Article
				title={title}
				intro={intro}
				content={contentWrapper.content}
				light={contentWrapper.headerLight}
				link={{
					href: '/forskning/kunskapsbank',
					text: 'Läs mer i kunskapsbanken',
				}}
			/>
			<DraftMode url={draftUrl} path='/forskning/om' />
		</>
	);
}

export async function generateMetadata({ params }): Promise<Metadata> {
	const { researchAbout } = await apiQuery(ResearchAboutDocument);

	return {
		title: researchAbout?.title,
	} as Metadata;
}
