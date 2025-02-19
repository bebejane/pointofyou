import { apiQuery } from 'next-dato-utils/api';
import { AllNewsDocument } from '@/graphql';
import s from './page.module.scss';
import Link from 'next/link';
import { Image } from 'react-datocms';
import Content from '@/components/common/Content';
import { DraftMode } from 'next-dato-utils/components';
import Article from '@/components/common/Article';
import { format } from 'date-fns';
import { Metadata } from 'next';

export type Props = {
	params: Promise<{
		category: 'aktuellt' | 'press';
	}>;
};

export default async function NewsPage({ params }) {
	const { category } = await params;
	const { allNews, allPresses, presskit, draftUrl } = await apiQuery<
		AllNewsQuery,
		AllNewsQueryVariables
	>(AllNewsDocument, { all: true });

	const news: any[] = category === 'aktuellt' ? allNews : allPresses;
	const title = category === 'aktuellt' ? 'Aktuellt' : 'Press';
	const basePath = category === 'aktuellt' ? '/nyheter/aktuellt' : '/nyheter/press';

	return (
		<>
			<Article title={title} className={s.news}>
				<ul>
					{news.map(({ id, title, slug, image, intro, _firstPublishedAt }, idx) => (
						<li key={id}>
							<div>
								<span className='meta'>{format(new Date(_firstPublishedAt), 'MM/dd yyyy')}</span>
								<Link href={`${basePath}/${slug}`}>
									<h2>{title}</h2>
								</Link>
								<Content content={intro} />
							</div>
							<figure>{image && <Image data={image.responsiveImage} />}</figure>
							{idx === 0 && category === 'press' && (
								<aside>
									<a href={presskit.zip?.url} download>
										Ladda ner presskit
									</a>
									<br />
									<Link href={'/kontakt'}>Kontakta oss</Link>
								</aside>
							)}
						</li>
					))}
				</ul>
			</Article>
			<DraftMode url={draftUrl} path={basePath} />
		</>
	);
}

export async function generateStaticParams() {
	return ['aktuellt', 'press'].map((category) => ({ category }));
}

export async function getStaticPaths() {
	return {
		paths: ['aktuellt', 'press'].map((category) => ({ params: { category } })),
		fallback: false,
	};
}

export async function generateMetadata({ params }) {
	const { category } = await params;
	return {
		title: category === 'aktuellt' ? 'Aktuellt' : 'Press',
	} as Metadata;
}
